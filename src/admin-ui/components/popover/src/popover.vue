<style lang="scss">
  @import "../../../style/vars";
  @import "../../../style/fade";
  .au-popover {
    position: absolute;
    // top: -99999;
    // left: -99999;
    z-index: $z-level-3;
    line-height: inherit;
    // min-height: 30px;
    // opacity: .95;
  }
  .au-popover:focus {
    outline: none;
  }
  .au-popover-triangle {
    position: absolute;
    left: 8px;
    bottom: -5px;
    z-index: -1;
    display: inline-block;
    width: 14px;
    height: 14px;
    transform: rotate(45deg);
  }
  .au-popover-triangle.top-center {
    left: 50%;
    margin-left: -7px;
  }
  .au-popover-triangle.top-right {
    right: 8px;
    left: auto;
  }
  .au-popover-triangle.bottom-left {
    top: -5px;
    bottom: auto;
    left: 8px;
    right: auto;
  }
  .au-popover-triangle.bottom-center {
    top: -5px;
    bottom: auto;
    left: 50%;
    margin-left: -7px;
  }
  .au-popover-triangle.bottom-right {
    top: -5px;
    bottom: auto;
    right: 10px;
    left: auto;
  }
  .au-popover-triangle.left-top {
    left: auto;
    right: -5px;
    top: 8px;
    bottom: auto;
    transform: rotate(-45deg);
  }
  .au-popover-triangle.left-middle {
    left: auto;
    right: -5px;
    top: 50%;
    margin-top: -7px;
    bottom: auto;
    transform: rotate(-45deg);
  }
  .au-popover-triangle.left-bottom {
    left: auto;
    right: -5px;
    top: auto;
    bottom: 8px;
    transform: rotate(-45deg);
  }
  .au-popover-triangle.right-bottom {
    right: auto;
    left: -5px;
    top: auto;
    bottom: 8px;
    transform: rotate(45deg);
  }
  .au-popover-triangle.right-middle {
    right: auto;
    left: -5px;
    top: 50%;
    margin-top: -7px;
    transform: rotate(45deg);
  }
  .au-popover-triangle.right-top {
    right: auto;
    left: -5px;
    top: 8px;
    bottom: auto;
    transform: rotate(45deg);
  }
  .au-popover-plain {
    box-sizing: content-box;
  }
  .au-popover-plain-triangle,
  .au-popover-plain {
    border-width: 1px;
    border-style: solid;
  }

  .au-popover-target-container {
    // display: inline-block;
    // border: 1px solid red;
  }
</style>
<template>
  <transition name="au-fade">
    <div
      class="au-popover au-theme-radius"
      :class="{'au-popover-plain au-theme-border-color--base-8': plain}"
      :tabindex="_uid"
      @blur="handleBlur($event)"
      ref="pop"
      v-show="display">
      <span ref="target" class="au-popover-target-container">
        <slot name="target"></slot>
      </span>
      <div ref="content" :class="{
        'au-popover-content': true,
        'au-theme-radius': true,
        'au-theme-background-color--base-2': !plain,
        'au-theme-font-color--base-12': !plain,
        'au-theme-background-color--base-12': plain,
        'au-theme-border-color--base-8': plain,
        'au-theme-font-color--base-3': plain
      }">
        <slot name="content"></slot>
      </div>
      <span
        v-show="triangle"
        :class="{
          'au-popover-triangle': true,
          [localPlacement.split(/\s+/).join('-')]: true,
          'au-theme-background-color--base-2': !plain,
          'au-theme-background-color--base-12': plain,
          'au-popover-plain-triangle au-theme-border-color--base-8': plain
        }"></span>
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
      plain: Boolean,
      placement: {
        type: String,
        default: 'top center'
      },
      disabled: Boolean,
      fix: {
        type: [String, Number],
        default: '0px'
      }
    },
    data () {
      return {
        display: false,
        originPopSize: {},
        localPlacement: ''
      }
    },
    mounted () {
      this.reconstruct()
      this.addEvents()
      this.calPos() // TODO:
      window.addEventListener('resize', this.calPos)

      // let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
      // if (MutationObserver) {
      //   this.observer = new MutationObserver((mutations) => {
      //     console.log(mutations)
      //     this.calPos()
      //   })
      //   let config = { attributes: true, childList: true, subtree: true }
      //   this.observer.observe(this.$refs.pop, config)
      // }
    },
    destroyed () {
      window.removeEventListener('resize', this.calPos)
      this.hide(true)
      // if (this.observe) this.observer.disconnect()
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
      },
      placement (v) {
        this.calPos()
      }
    },
    methods: {
      reconstruct () {
        // if (this.disabled) return
        let target = this.$refs.target
        let pop = this.$refs.pop

        pop.setAttribute('id', 'au-popover-' + this._uid)
        if (target.parentNode === pop) pop.parentNode.insertBefore(target, pop)
        if (pop.parentNode !== document.body) document.body.appendChild(pop)
      },
      addEvents () {
        if (this.trigger === 'click') {
          this.$refs.target.addEventListener('click', this.handleClick)
          // this.$refs.pop.addEventListener('blur', this.handleBlur)
        } else {
          this.$refs.target.addEventListener('mouseenter', this.handleMouseover)
          this.$refs.target.addEventListener('mouseleave', this.handleMouseout)
        }
      },
      removeEvents () {
        this.$refs.target.removeEventListener('click', this.handleClick)
        // this.$refs.pop.removeEventListener('blur', this.handleBlur)
        this.$refs.target.removeEventListener('mouseenter', this.handleMouseover)
        this.$refs.target.removeEventListener('mouseleave', this.handleMouseout)
      },
      handleClick () {
        this.display ? this.hide() : this.show()
      },
      handleBlur () { // pop blur
        this.hide()
      },
      handleMouseover () {
        this.show()
      },
      handleMouseout () {
        this.hide()
      },
      show () {
        if (this.disabled) return
        this.calPos()
        // this.originPopSize = {
        //   width: window.getComputedStyle(this.$refs.pop).width,
        //   height: window.getComputedStyle(this.$refs.pop).height
        // }
        this.display = true
        this.$nextTick(() => {
          this.$refs.pop.focus()
        })
      },
      hide (destroy) {
        // if (this.disabled) return
        // this.calPos()
        if (!destroy) {
          this.display = false
          let fix = () => {
            // this.fixSize(this.originPopSize)
            this.$refs.pop.removeEventListener('transitionend', fix)
          }
          this.$refs.pop.addEventListener('transitionend', fix)
        } else {
          document.querySelector(`#au-popover-${this._uid}`).style.display = 'none'
        }
      },
      calPos () {
        let targetElm = this.$slots.target[0].elm
        if (!targetElm) return

        let targetElmDisplay = window.getComputedStyle(targetElm).display
        if (targetElmDisplay !== 'none') this.$refs.target.style.display = targetElmDisplay

        // let popElmSize = getElementSize(this.$slots.content[0].elm)
        // this.$refs.pop.style.width = popElmSize.width + 'px'
        // this.$refs.pop.style.height = popElmSize.height + 'px'

        let targetSize = getElementSize(this.$refs.target)
        let targetPos = getElementPagePos(this.$refs.target)
        let popSize = getElementSize(this.$refs.content)

        // fix the size bug witch caused by the wordwrap
        // this.$refs.pop.style.width = popSize.width + 'px'
        // this.$refs.pop.style.height = popSize.height + 'px'

        let offset = 10

        let vertical = {
          x: {
            left: targetPos.left + parseInt(this.fix),
            center: targetPos.left + targetSize.width / 2 - popSize.width / 2 + parseInt(this.fix),
            right: targetPos.left + targetSize.width - popSize.width + parseInt(this.fix)
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
            top: targetPos.top + parseInt(this.fix),
            middle: targetPos.top + targetSize.height / 2 - popSize.height / 2 + 2 + parseInt(this.fix), // do not kown why should add 2 but it works
            bottom: targetPos.top + targetSize.height - popSize.height + 11 + parseInt(this.fix)// do not kown why should add 10 but it works
          }
        }

        let keys = this.placement.split(/\s+/)
        let xes = new Set(['top', 'bottom', 'left', 'right'])
        let ys = new Set(['left', 'center', 'right', 'top', 'middle', 'bottom'])
        if (keys.length !== 2 || !xes.has(keys[0]) || !ys.has(keys[1])) {
          keys = ['top', 'center']
        }
        this.localPlacement = keys.join(' ')

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
