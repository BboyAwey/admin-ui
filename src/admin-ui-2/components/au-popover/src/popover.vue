<style lang="scss">
  @import "../../../style/vars";
  @import "../../../style/fade";
  .au-popover {
    position: absolute;
    top: 0; // TODO: set to huge
    left: 0; // TODO: set to huge
    z-index: $z-level-3;
    // opacity: .95;
  }
  .au-popover-trangle {
    position: absolute;
    left: 5px;
    bottom: -8px;
    display: inline-block;
    width: 20px;
    height: 10px;
    overflow: hidden;
  }
  .au-popover-trangle:before {
    content: "";
    display: inline-block;
    width: 0;
    height: 0;
    border-width: 10px;
    border-style: solid;
    border-left-color: transparent;
    border-right-color: transparent;
    border-bottom-color: transparent;
  }
  .au-popover-trangle.top-center {
    left: 50%;
    margin-left: -10px;
  }
  .au-popover-trangle.top-right {
    right: 10px;
    left: auto;
  }
  .au-popover-content.bottom-left {
    top: -10px;
    bottom: auto;
    transform: rotate(180deg);
  }
  .au-popover-trangle.bottom-center {
    top: -10px;
    bottom: auto;
    left: 50%;
    margin-left: -10px;
    transform: rotate(180deg);
  }
  .au-popover-trangle.bottom-right {
    top: -10px;
    bottom: auto;
    right: 10px;
    transform: rotate(180deg);
  }
  .au-popover-trangle.left-top {
    left: auto;
    right: -12px;
    top: 10px;
    bottom: auto;
    transform: rotate(-90deg);
  }
  .au-popover-trangle.left-middle {
    left: auto;
    right: -12px;
    top: 50%;
    margin-top: -3px;
    bottom: auto;
    transform: rotate(-90deg);
  }
  .au-popover-trangle.left-bottom {
    left: auto;
    right: -12px;
    top: auto;
    bottom: 10px;
    transform: rotate(-90deg);
  }
  .au-popover-trangle.right-bottom {
    right: auto;
    left: -12px;
    top: auto;
    bottom: 10px;
    transform: rotate(90deg);
  }
  .au-popover-trangle.right-middle {
    right: auto;
    left: -12px;
    top: 50%;
    margin-top: -3px;
    transform: rotate(90deg);
  }
  .au-popover-trangle.right-bottom {
    right: auto;
    left: -12px;
    top: auto;
    bottom: 10px;
    transform: rotate(90deg);
  }
</style>
<template>
  <transition name="au-fade">
    <div class="
      au-popover
      au-theme-background-color--base-2
      au-theme-font-color--base-12
      au-theme-radius"
      :class="popClass" ref="pop" v-show="display">
      <span ref="target">
        <slot name="target"></slot>
      </span>
      <span ref="content" class="au-popover-content">
        <slot name="content"></slot>
      </span>
      <span
        v-show="triangle"
        class="au-popover-trangle au-theme-before-border-color--base-2"
        :class="placement.split(/\s+/).join('-') + ' ' + popClass"></span>
    </div>
  </transition>
</template>
<script>
  import { getElementSize, getElementPagePos } from '../../../helpers/dom'

  export default {
    name: 'au-popover',
    props: {
      trigger: String,
      triangle: {
        type: Boolean,
        default: true
      },
      triangleClass: String,
      popClass: String,
      placement: {
        type: String,
        default: 'top center'
      },
      disabled: Boolean
    },
    data () {
      return {
        display: false,
        originPopSize: {}
      }
    },
    mounted () {
      this.reconstruct()
      this.addEvents()
      // this.calPos()
    },
    watch: {
      trigger () {
        this.removeEvents()
        this.addEvents()
      },
      display (v) {
        if (v) this.$emit('show')
        else this.$emit('hide')
      },
      disabled (v) {
        this.reconstruct()
      }
    },
    methods: {
      reconstruct () {
        if (this.disabled) return
        let target = this.$refs.target
        let pop = this.$refs.pop

        if (target.parentNode === pop) pop.parentNode.insertBefore(target, pop)
        if (pop.parentNode !== document.body) document.body.appendChild(pop)
      },
      addEvents () {
        if (this.trigger === 'click') {
          this.$refs.target.addEventListener('click', this.handleClick)
        } else {
          this.$refs.target.addEventListener('mouseenter', this.handleMouseover)
          this.$refs.target.addEventListener('mouseleave', this.handleMouseout)
        }
      },
      removeEvents () {
        this.$refs.target.removeEventListener('click', this.handleClick)
        this.$refs.target.removeEventListener('mouseenter', this.handleMouseover)
        this.$refs.target.removeEventListener('mouseleave', this.handleMouseout)
      },
      handleClick () {
        !this.display ? this.show() : this.hide()
      },
      handleMouseover () {
        this.show()
      },
      handleMouseout () {
        this.hide()
      },
      show (target, placement) {
        if (this.disabled) return
        this.originPopSize = {
          width: window.getComputedStyle(this.$refs.pop).width,
          height: window.getComputedStyle(this.$refs.pop).height
        }
        this.calPos(target, placement)
        this.display = true
      },
      hide () {
        if (this.disabled) return
        // this.calPos()
        this.display = false
        let fix = () => {
          this.fixSize(this.originPopSize)
          this.$refs.pop.removeEventListener('transitionend', fix)
        }
        this.$refs.pop.addEventListener('transitionend', fix)
      },
      calPos (target, placement) {
        let targetSize = getElementSize(target || this.$refs.target)
        let targetPos = getElementPagePos(target || this.$refs.target)
        let popSize = getElementSize(this.$refs.pop)

        // fix the size bug witch caused by the wordwrap
        this.$refs.pop.style.width = popSize.width + 'px'
        this.$refs.pop.style.height = popSize.height + 'px'

        let offset = 10

        let vertical = {
          x: {
            left: targetPos.left,
            center: targetPos.left + targetSize.width / 2 - popSize.width / 2,
            right: targetPos.left + targetSize.width - popSize.width
          },
          y: {
            top: targetPos.top - popSize.height - offset,
            bottom: targetPos.top + targetSize.height + offset + 10 // do not kown why should add 10 but it works
          }
        }
        let horizontal = {
          x: {
            left: targetPos.left - offset - popSize.width,
            right: targetPos.left + targetSize.width + offset
          },
          y: {
            top: targetPos.top,
            middle: targetPos.top + targetSize.height / 2 - popSize.height / 2 + 2, // do not kown why should add 2 but it works
            bottom: targetPos.top + targetSize.height - popSize.height + 11 // do not kown why should add 10 but it works
          }
        }

        let keys = placement ? placement.split(/\s+/) : this.placement.split(/\s+/)
        if (keys.length !== 2) keys = ['top', 'center']

        let res = {}
        if (keys[0] === 'top' || keys[0] === 'bottom') {
          res = {
            x: vertical.x[keys[1]],
            y: vertical.y[keys[0]]
          }
        } else if (keys[0] === 'left' || keys[0] === 'right') {
          res = {
            x: horizontal.x[keys[0]],
            y: horizontal.y[keys[1]]
          }
        }
        this.$refs.pop.style.left = res.x + 'px'
        this.$refs.pop.style.top = res.y + 'px'
      },
      fixSize (origin) {
        this.$refs.pop.style.width = origin.width
        this.$refs.pop.style.height = origin.height
      }
    }
  }
</script>
