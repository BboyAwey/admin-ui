<style lang="scss">
  @import '../../../style/vars';
  .au-modal-container {
    display: flex;
    align-items: center;
    justify-content: center;
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
    flex: none;
    max-width: 90%;
    max-height: 90%;
    display: flex;
    align-items: stretch;
    overflow: hidden;
  }
  .au-modal {
    position: relative;
    width: 100%;
    z-index: 1;
    padding: 20px;
  }
  .au-modal-title {
    position: absolute;
    top: 20px;
    left: 0;
    padding: 0 20px;
    margin: 0;
    overflow: hidden;
    text-align: left;
    font-weight: bold;
    font-size: 16px;
  }
  .au-modal-content {
    position: relative;
    min-width: 320px;
    height: 100%;
    text-align: left;
  }
  .au-modal-operations {
    width: 100%;
    position: absolute;
    bottom: 20px;
    left: 0;
    padding: 12px 20px 0 20px;
    text-align: right;
  }
  // .au-modal-button:not(:last-child) {
  //   margin-right: 8px;
  // }
  // .au-modal-dec-line {
  //   border-bottom-width: 1px;
  //   border-bottom-style: solid;
  // }
  .au-modal-close-icon {
    position: absolute;
    top: 5px;
    right: 7px;
    font-size: $large;
    cursor: pointer;
  }
</style>
<template>
  <div
    class="au-modal-container au-theme-before-background-color--base-0 au-theme-color--base-3"
    v-show="localDisplay"
    ref="modalContainer"
    @click="handleModalMaskingClick">
    <div class="au-modal-cell" :style="{
      width, height,
      minWidth, minHeight,
      maxWidth, maxHeight
    }">
      <div class="
        au-modal
        au-theme-border-radius--large
        au-theme-background-color--base-12"
        :style="{
          paddingTop: title ? '54px' : '32px',
          paddingBottom: buttons && buttons.length ? '64px' : '20px'
        }">
        <h4 class="au-modal-title au-theme-border-color--base-10" v-show="title">{{ title }}</h4>
        <au-scroller v-if="autoScroll" class="au-modal-content" stop-propagation>
          <!-- this ref will used by message-box, donot remove it -->
          <div ref="content"><slot></slot></div>
        </au-scroller>
        <div v-if="!autoScroll" class="au-modal-content" ref="content">
          <slot></slot>
        </div>
        <!-- <div class="au-modal-dec-line au-theme-border-color--base-10"></div> -->
        <div class="au-modal-operations" v-show="buttons && buttons.length">
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
import AuButton from 'components/button'
import AuIcon from 'components/icon'
import AuScroller from 'components/scroller'

export default {
  name: 'au-modal',
  components: { AuButton, AuIcon, AuScroller },
  data () {
    return {
      localDisplay: this.visible,
      buttonLoadings: [],
      placement: null
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
    minWidth: {
      type: [String, Number]
    },
    minHeight: {
      type: [String, Number]
    },
    maxWidth: {
      type: [String, Number]
    },
    maxHeight: {
      type: [String, Number]
    },
    onEnter: String,
    modalClick: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    visible (v) {
      this.localDisplay = v
    },
    localDisplay (v) {
      this.action()
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
    handleModalMaskingClick (e) {
      if (!this.modalClick) return
      if (e.target === this.$refs.modalContainer) this.hide()
    },
    escHandler (e) {
      if (e.keyCode !== 27) return
      this.hide()
    },
    enterHandler (e) {
      if (e.keyCode !== 13) return
      this.buttons.forEach((button, index) => {
        if (button.text === this.onEnter) this.operate(index)
      })
    },
    action () {
      if (this.localDisplay) {
        if (!this.placement) {
          this.placement = document.createElement('span')
        }
        this.$el.parentNode.insertBefore(this.placement, this.$el)
        document.body.appendChild(this.$el)

        window.addEventListener('keyup', this.escHandler)
        if (this.onEnter) window.addEventListener('keyup', this.enterHandler)
      } else {
        if (this.placement) this.placement.parentNode.insertBefore(this.$el, this.placement)
        window.removeEventListener('keyup', this.escHandler)
        if (this.onEnter) window.removeEventListener('keyup', this.enterHandler)
      }
    }
  },
  mounted () {
    this.action()
  }
}
</script>
