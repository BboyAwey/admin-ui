<style lang="scss">
  @import '../../../style/vars';
  .au-modal-container {
    display: table;
    // text-align: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: $z-level-2;
    width: 100%;
    height: 100%;
  }
  .au-modal-container:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    opacity: .75;
  }
  .au-modal-cell {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
  }
  .au-modal {
    display: inline-block;
    position: relative;
    vertical-align: middle;
    margin: 0 auto;
    z-index: 1;
    padding: 20px;
  }
  .au-modal-title {
    // height: 30px;
    margin: 0;
    // padding-bottom: 12px;
    // border-bottom-width: 1px;
    // border-bottom-style: solid;
    overflow: hidden;
    text-align: left;
    font-weight: bold;
    font-size: 16px;
  }
  .au-modal-content {
    min-width: 320px;
    margin: 12px 0 0 0;
    text-align: left;
  }
  .au-modal-operations {
    padding-top: 12px;
    text-align: right;
  }
  .au-modal-button:not(:last-child) {
    margin-right: 8px;
  }
  .au-modal-dec-line {
    // border-bottom-width: 1px;
    // border-bottom-style: solid;
  }
  .au-modal-close-icon {
    position: absolute;
    top: 5px;
    right: 7px;
    font-size: $large;
    cursor: pointer;
  }
  .au-modal-content-scroller {
    height: 100%;
  }
</style>
<template>
  <div
    class="au-modal-container au-theme-before-background-color--base-0 au-theme-color--base-3"
    v-show="localDisplay"
    ref="modalContainer"
    @click="handleModalMaskingClick">
    <div class="au-modal-cell">
      <div class="au-modal au-theme-border-radius--large au-theme-background-color--base-12" ref="modal">
        <h4 class="au-modal-title au-theme-border-color--base-10" v-show="title" ref="title">{{ title }}</h4>
        <div class="au-modal-content" ref="content">
          <au-scroller class="au-modal-content-scroller" stop-propagation>
            <slot></slot>
          </au-scroller>
        </div>
        <div class="au-modal-dec-line au-theme-border-color--base-10" ref="decline"></div>
        <div class="au-modal-operations" v-show="buttons && buttons.length" ref="operations">
          <au-button
            class="au-modal-button"
            v-for="(button, i) in buttons"
            :key="i"
            :type="button.type"
            :size="button.size"
            :plain="button.plain"
            :disabled="button.disabled"
            :loading="buttonLoadings[i]"
            @click="operate(i)">{{ button.text }}</au-button>
        </div>
        <au-icon type="times" @click="hide" class="au-modal-close-icon au-theme-hover-color--primary"></au-icon>
      </div>
    </div>
  </div>
</template>
<script>
import getElementSize from '../../../helpers/dom/get-element-size'
import getWindowSize from '../../../helpers/dom/get-window-size'
import AuButton from '../../button'
import AuIcon from '../../icon'
import AuScroller from '../../scroller'

export default {
  name: 'au-modal',
  components: { AuButton, AuIcon, AuScroller },
  mounted () {
    window.addEventListener('resize', this.resizeHandler)
  },
  destroyed () {
    window.removeEventListener('resize', this.resizeHandler)
  },
  data () {
    return {
      localDisplay: this.visible,
      buttonLoadings: []
    }
  },
  props: {
    visible: {
      type: Boolean
    },
    title: {
      type: String
    },
    buttons: {
      type: Array
    },
    width: {
      type: [String, Number]
    },
    height: {
      type: [String, Number]
    },
    onEnter: String
  },
  watch: {
    visible (v) {
      this.localDisplay = v
      if (v) {
        this.$nextTick(_ => {
          this.calcModalStyle()
          this.calModalContentStyle()
        })
        window.addEventListener('keyup', this.escHandler)
        if (this.onEnter) window.addEventListener('keyup', this.enterHandler)
      } else {
        window.removeEventListener('keyup', this.escHandler)
        if (this.onEnter) window.removeEventListener('keyup', this.enterHandler)
      }
    },
    localDisplay (v) {
      this.$emit(v ? 'show' : 'hide')
    }
  },
  methods: {
    hide () {
      this.localDisplay = false
    },
    show () {
      this.localDisplay = true
    },
    operate (index) {
      let vm = this
      vm.buttons[index].handler.call(vm.$parent, {
        start () {
          vm.$set(vm.buttonLoadings, index, true)
        },
        stop () {
          vm.$set(vm.buttonLoadings, index, false)
        }
      })
    },
    calcModalStyle () {
      // width and height has to be legal css value
      let { width, height } = this
      let maxWidth = null
      let maxHeight = null
      let winSize = getWindowSize()
      // if not given height we should set a max height
      if (!height) maxHeight = winSize.height - 80 + 'px'
      // if not given width
      if (!width) maxWidth = winSize.width - 200 + 'px'

      let modalStyle = {
        [maxWidth ? 'max-width' : 'width']: maxWidth || width,
        [maxHeight ? 'max-height' : 'height']: maxHeight || height
      }

      for (let key in modalStyle) {
        this.$refs.modal.style[key] = modalStyle[key]
      }
    },
    calModalContentStyle () {
      // clear the prev result
      if (!this.height) this.$refs.content.style.height = 'auto'

      let operationHeight = 0
      let titleHeight = 0
      if (this.buttons.length && this.$refs.operations) {
        operationHeight = getElementSize(this.$refs.operations).height
      }
      if (this.title) {
        titleHeight = getElementSize(this.$refs.title).height
      }
      let modalHeight = getElementSize(this.$refs.modal).height

      // we need to minus the padding value of modal and opreation divs and the decline height
      this.$refs.content.style.height = modalHeight - operationHeight - titleHeight - 40 + 'px'
    },
    resizeHandler () {
      this.calcModalStyle()
      this.calModalContentStyle()
    },
    handleModalMaskingClick (e) {
      if (e.target === this.$refs.modalContainer) this.hide()
    },
    escHandler (e) {
      if (e.keyCode !== 27) return
      this.hide()
    },
    enterHandler (e) {
      if (e.keyCode !== 13) return
      this.buttonList.forEach(button => {
        if (button.text === this.onEnter) this.operate(button)
      })
    }
  }
}
</script>
