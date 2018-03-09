<style lang="scss">
  @import "../../../style/vars";
  // @import "../../../style/fade";
  .au-popover {
    position: absolute;
    z-index: $z-level-1;
    line-height: inherit;
  }
  .au-popover:focus {
    outline: none;
  }
  .au-popover-triangle {
    position: absolute;
    left: 8px;
    bottom: -4px;
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
</style>
<template>
  <!-- <div
    class="au-popover au-theme-border-radius--normal au-theme-box-shadow--level-3"
    :class="{'au-popover-plain au-theme-border-color--base-8': plain}"
    :tabindex="_uid"
    @blur="handleBlur($event)" -->
  <div
    class="au-popover au-theme-border-radius--normal au-theme-box-shadow--level-2"
    :class="{'au-popover-plain au-theme-border-color--base-8': plain}"
    :tabindex="_uid"
    ref="pop">
    <slot name="target"></slot>
    <div ref="content" :class="{
      'au-popover-content': true,
      'au-theme-border-radius--normal': true,
      'au-theme-background-color--base-2': !plain,
      'au-theme-font-color--base-12': !plain,
      'au-theme-background-color--base-12': plain,
      'au-theme-border-color--base-8': plain,
      'au-theme-font-color--base-3': plain}">
      <slot name="content"></slot>
    </div>
    <span
      v-show="triangle"
      :class="{
        'au-popover-triangle': true,
        [localPlacement.split(/\s+/).join('-')]: true,
        'au-theme-background-color--base-2': !plain,
        'au-theme-background-color--base-12': plain,
        'au-popover-plain-triangle au-theme-border-color--base-8': plain}"></span>
  </div>
</template>
<script>
  import { getElementSize, getElementPagePos, isAncestor } from '../../../helpers/dom'
  import { namespace } from '../../../helpers/utils'

  function getRealZIndex (el) {
    if (!el || el === document) return 0
    let zIndex = 0
    zIndex = window.getComputedStyle(el).zIndex
    zIndex = (zIndex === 'auto' || !zIndex) ? 0 : parseInt(zIndex)
    zIndex = zIndex + (el.parentNode ? getRealZIndex(el.parentNode) : 0)
    return zIndex
  }

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
      x: [String, Number],
      y: [String, Number],
      xFix: {
        type: [String, Number],
        default: '0px'
      },
      yFix: {
        type: [String, Number],
        default: '0px'
      },
      hideOnBlur: Boolean
      // zIndex: [String, Number]
    },
    data () {
      return {
        visible: false,
        originPopSize: {},
        localPlacement: '',
        rootIndex: 0
      }
    },
    mounted () {
      this.reconstruct()
      this.addEvents()
      // this.calPos()
      window.addEventListener('resize', this.handleWindowResize)
      window.addEventListener('click', this.handleWindowClick, true)
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
    beforeDestroy () {
      window.removeEventListener('resize', this.handleWindowResize)
      window.removeEventListener('click', this.handleWindowClick, true)
      this.hide()
      // if (this.observe) this.observer.disconnect()
    },
    watch: {
      trigger () {
        this.removeEvents()
        this.addEvents()
      },
      visible (v) {
        if (v) this.$emit('show')
        else this.$emit('hide')
      },
      disabled (v) {
        // this.reconstruct()
      },
      placement (v) {
        this.calPos()
      }
    },
    methods: {
      getTarget () {
        let target = this.$slots.target[0].elm
        let id = target.getAttribute('data-au-popover')
        if (id) { // nested popover
          target = namespace.get('au-popover-' + id).$slots.target[0].elm
        }
        return target
      },
      reconstruct () {
        // if (this.disabled) return
        let target = this.getTarget()
        let pop = this.$refs.pop
        let id = 'au-popover-' + this._uid
        let zIndex = getRealZIndex(pop.parentNode) || 9999 // sometimes it will use in a modal or other elements witch has z-index style
        // register popover on root
        pop.setAttribute('data-au-popover', id)
        namespace.set('au-popover-' + id, this)

        if (target.parentNode === pop) {
          pop.parentNode.insertBefore(target, pop)
          pop.parentNode.removeChild(pop)
          pop.style.zIndex = zIndex
        }
        // if (pop.parentNode !== document.body) document.body.appendChild(pop)
      },
      addEvents () {
        let target = this.getTarget()
        if (this.trigger === 'click') {
          target.addEventListener('click', this.handleClick)
        } else {
          target.addEventListener('mouseenter', this.handleMouseover)
          target.addEventListener('mouseleave', this.handleMouseout)
        }
      },
      removeEvents () {
        let target = this.getTarget()
        target.removeEventListener('click', this.handleClick)
        target.removeEventListener('mouseenter', this.handleMouseover)
        target.removeEventListener('mouseleave', this.handleMouseout)
      },
      handleClick () {
        if (this.trigger === 'click') {
          this.visible ? this.hide() : this.show()
        }
      },
      // handleBlur (e) { // pop blur
      //   if (this.trigger === 'click' && this.visible && this.hideOnBlur) this.hide()
      // },
      handleMouseover () {
        this.show()
      },
      handleMouseout () {
        if (this.trigger !== 'click' && this.visible) this.hide()
      },
      show () {
        if (this.disabled) return
        this.calPos()
        // this.originPopSize = {
          //   width: window.getComputedStyle(this.$refs.pop).width,
        //   height: window.getComputedStyle(this.$refs.pop).height
        // }
        if (!this.$refs.pop.parentNode) document.body.appendChild(this.$refs.pop)
        this.$refs.pop.focus()
        this.visible = true
        if (!this.$root._auPopovers) this.$root._auPopovers = {}
        this.$root._auPopovers[this._uid] = this
        this.rootIndex = this.$root._auPopovers.length - 1
        // setInterval(this.calPos.bind(this), 500)
      },
      hide () {
        try {
          this.$refs.pop.parentNode.removeChild(this.$refs.pop)
        } catch (e) {}
        this.visible = false
        if (this.$root._auPopovers && this.$root._auPopovers[this._uid]) delete this.$root._auPopovers[this._uid]
        // clearInterval(this.calPos.bind(this))
      },
      calPos () {
        let pop = this.$refs.pop
        let target = this.getTarget()
        let content = this.$refs.content
        if (!target) return

        // let popElmSize = getElementSize(this.$slots.content[0].elm)
        // this.$refs.pop.style.width = popElmSize.width + 'px'
        // this.$refs.pop.style.height = popElmSize.height + 'px'

        let keys = this.placement.split(/\s+/)
        let xes = new Set(['top', 'bottom', 'left', 'right'])
        let ys = new Set(['left', 'center', 'right', 'top', 'middle', 'bottom'])
        if (keys.length !== 2 || !xes.has(keys[0]) || !ys.has(keys[1])) {
          keys = ['top', 'center']
        }
        this.localPlacement = keys.join(' ')

        if (this.x && this.y) {
          pop.style.left = this.x
          pop.style.top = this.y
          return
        }

        let targetSize = getElementSize(target)
        let targetPos = getElementPagePos(target)
        let popSize = getElementSize(content)
        let windowSize = {
          width: document.body.clientWidth,
          height: document.body.clientHeight
        }

        // handle screen overflow
        let targetRect = target.getBoundingClientRect()
        if (targetRect.top < popSize.height && keys[0] === 'top') keys[0] = 'bottom'
        if (windowSize.height - targetRect.bottom < popSize.height && keys[0] === 'bottom') keys[0] = 'top'
        if (targetRect.left < popSize.width && keys[0] === 'left') keys[0] = 'rigth'
        if (windowSize.width - targetRect.right < popSize.width && keys[0] === 'right') keys[0] = 'left'

        if (keys[0] === 'left' || keys[0] === 'right') {
          if (keys[1] !== 'top') {
            if (targetRect.top < (popSize.height / (keys[1] === 'middle' ? 2 : 1) - targetSize.height)) keys[1] = 'top'
          }
          if (keys[1] !== 'bottom') {
            if (windowSize.height - targetRect.bottom < (popSize.height / (keys[1] === 'middle' ? 2 : 1) - targetSize.height)) keys[1] = 'bottom'
          }
        }
        if (keys[0] === 'top' || keys[0] === 'bottom') {
          if (keys[1] !== 'left') {
            if (targetRect.left < (popSize.width / (keys[1] === 'center' ? 2 : 1) - targetSize.width)) keys[1] = 'left'
          }
          if (keys[1] !== 'right') {
            if (windowSize.width - targetRect.right < (popSize.widht / (keys[1] === 'middle' ? 2 : 1) - targetSize.width)) keys[1] = 'right'
          }
        }

        this.localPlacement = keys.join(' ')

        // fix the size bug witch caused by the wordwrap
        // this.$refs.pop.style.width = popSize.width + 'px'
        // this.$refs.pop.style.height = popSize.height + 'px'

        let offset = 10
        let vertical = {
          x: {
            left: targetPos.left + parseInt(this.xFix),
            center: targetPos.left + targetSize.width / 2 - popSize.width / 2 + parseInt(this.xFix),
            right: targetPos.left + targetSize.width - popSize.width + parseInt(this.xFix)
          },
          y: {
            top: targetPos.top - popSize.height - offset + parseInt(this.yFix),
            bottom: targetPos.top + targetSize.height + offset + parseInt(this.yFix) // do not kown why should add 10 but it works
          }
        }
        let horizontal = {
          x: {
            left: targetPos.left - offset - popSize.width + parseInt(this.xFix),
            right: targetPos.left + targetSize.width + offset + parseInt(this.xFix)
          },
          y: {
            top: targetPos.top + parseInt(this.yFix),
            middle: targetPos.top + targetSize.height / 2 - popSize.height / 2 + parseInt(this.yFix),
            bottom: targetPos.top + targetSize.height - popSize.height + 11 + parseInt(this.yFix) // do not kown why should add 11 but it works
          }
        }
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
        pop.style.left = this.x || res.x + 'px'
        pop.style.top = this.y || res.y + 'px'
      },
      handleWindowClick (e) {
        if (this.trigger === 'click' &&
          this.visible && this.hideOnBlur &&
          !isAncestor(e.target, this.$el) &&
          !isAncestor(e.target, this.getTarget())) this.hide()
      },
      handleWindowResize () {
        if (this.visible) this.calPos()
      }
    }
  }
</script>
