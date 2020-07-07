<style lang="scss">
  @import "../../../style/vars";
  // @import "../../../style/fade";
  .au-popover {
    position: absolute;
    z-index: $z-level-1;
    line-height: inherit;
    /* transition-property: left, top, bottom, right;
    transition-duration: .2s;
    transition-timing-function: ease; */
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
    class="au-popover au-theme-border-radius--small au-theme-box-shadow--base"
    :class="{'au-popover-plain au-theme-border-color--base-11': plain}"
    :tabindex="_uid"
    @blur="handleBlur($event)" -->
  <div
    class="au-popover au-theme-border-radius--small au-theme-box-shadow--base"
    :class="{'au-popover-plain au-theme-border-color--base-10': plain}"
    :tabindex="_uid"
    ref="pop">
    <slot name="target"></slot>
    <div ref="content" :class="{
      'au-popover-content': true,
      'au-theme-border-radius--small': true,
      'au-theme-background-color--base-2': !plain,
      'au-theme-color--base-12': !plain,
      'au-theme-background-color--base-12': plain,
      'au-theme-border-color--base-10': plain,
      'au-theme-color--base-3': plain}">
      <slot name="content"></slot>
    </div>
    <span
      v-show="triangle"
      :class="{
        'au-popover-triangle': true,
        [localPlacement.split(/\s+/).join('-')]: true,
        'au-theme-background-color--base-2': !plain,
        'au-theme-background-color--base-12': plain,
        'au-popover-plain-triangle au-theme-border-color--base-10': plain}"></span>
  </div>
</template>
<script>
import { getElementSize, isAncestor } from 'helpers/dom'
import { namespace, heartbeat } from 'helpers/utils'

if (!namespace.get('popoverCollections')) namespace.set('popoverCollections', {})
let popoverCollections = namespace.get('popoverCollections')

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
    hideOnBlur: Boolean,
    beforeShow: {
      type: Function,
      default () { return () => true }
    }
    // zIndex: [String, Number]
  },
  data () {
    return {
      visible: false,
      originPopSize: {},
      localPlacement: this.placement,
      rootIndex: 0
    }
  },
  mounted () {
    this.reconstruct()
    this.addEvents()
    window.addEventListener('resize', this.handleWindowResize)
    window.addEventListener('click', this.handleWindowClick, true)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleWindowResize)
    window.removeEventListener('click', this.handleWindowClick, true)
    this.hide()
    heartbeat.remove(this.heartbeatIndex)
  },
  watch: {
    trigger () {
      this.addEvents()
    },
    visible (v) {
      if (v) this.$emit('show')
      else this.$emit('hide')
    },
    placement (v) {
      this.calPos()
    }
  },
  methods: {
    getTarget () {
      if (this._target) return this._target
      this._target = this.$slots.target[0].elm
      let id = this._target.getAttribute('data-au-popover')
      if (id) { // nested popover
        this._target = popoverCollections[id].$slots.target[0].elm
      }
      return this._target
    },
    reconstruct () {
      let target = this.getTarget()
      // store pop and content refs to vm
      // because sometimes it could be undefined
      // when get them in async methods like show() or calcPos()
      this.__pop = this.$refs.pop
      this.__content = this.$refs.content

      let id = 'au-popover-' + this._uid
      this.__pop.setAttribute('data-au-popover', id)
      popoverCollections[id] = this

      if (target.parentNode === this.__pop) {
        // sometimes it will use in a modal or other elements witch has z-index style
        this.__pop.parentNode && this.__pop.parentNode.insertBefore(target, this.__pop)
        this.__pop.parentNode && this.__pop.parentNode.removeChild(this.__pop)
      }
      // pop.style.zIndex = getRealZIndex(target.parentNode) || 9999
      // if (pop.parentNode !== document.body) document.body.appendChild(pop)
    },
    addEvents () {
      this.removeEvents()
      let target = this.getTarget()
      if (this.trigger === 'click') {
        target.addEventListener('click', this.handleClick)
      } else if (this.trigger === 'hover') {
        target.addEventListener('mouseenter', this.handleMouseenter)
        target.addEventListener('mouseleave', this.handleMouseleave)
      }
    },
    removeEvents () {
      let target = this.getTarget()
      target.removeEventListener('click', this.handleClick)
      target.removeEventListener('mouseenter', this.handleMouseenter)
      target.removeEventListener('mouseleave', this.handleMouseleave)
    },
    handleClick () {
      if (this.trigger === 'click') {
        this.visible ? this.hide() : this.show()
      }
    },
    handleMouseenter () {
      this.show()
    },
    handleMouseleave () {
      if (this.trigger !== 'click' && this.visible) this.hide()
    },
    show () {
      if (this.disabled) return
      let res = this.beforeShow()
      if (res !== undefined && !res) return
      this.calPos()
      // this.originPopSize = {
      //   width: window.getComputedStyle(this.__pop).width,
      //   height: window.getComputedStyle(this.__pop).height
      // }
      if (!this.__pop.parentNode) document.body.appendChild(this.__pop)
      if (this.trigger && this.hideOnBlur) {
        this.__pop.focus()
      }

      let target = this.getTarget()
      let pop = this.__pop
      pop.style.zIndex = getRealZIndex(target.parentNode) || 9999

      this.visible = true
      this.$forceUpdate()

      heartbeat.add(this.calPos.bind(this), this._uid)
    },
    hide () {
      heartbeat.remove(this._uid)
      try {
        this.__pop.parentNode.removeChild(this.__pop)
      } catch (e) {}
      this.visible = false
    },
    calPos () {
      let pop = this.__pop
      let target = this.getTarget()
      let content = this.__content
      if (!target) return

      // let popElmSize = getElementSize(this.$slots.content[0].elm)
      // this.__pop.style.width = popElmSize.width + 'px'
      // this.__pop.style.height = popElmSize.height + 'px'

      let keys = this.placement.split(/\s+/)
      let xes = new Set(['top', 'bottom', 'left', 'right'])
      let ys = new Set(['left', 'center', 'right', 'top', 'middle', 'bottom'])
      if (keys.length !== 2 || !xes.has(keys[0]) || !ys.has(keys[1])) {
        keys = ['top', 'center']
      }
      // this.localPlacement = keys.join(' ')

      if (this.x && this.y) {
        pop.style.left = this.x
        pop.style.top = this.y
        return
      }

      let targetSize = getElementSize(target)
      let popSize = getElementSize(content)
      let windowSize = {
        width: document.body.clientWidth,
        height: document.body.clientHeight
      }
      // handle screen overflow
      let targetRect = target.getBoundingClientRect()

      if (keys[0] === 'top') {
        if (targetRect.top - 10 < popSize.height) keys[0] = 'bottom'
      } else if (keys[0] === 'bottom') {
        if (windowSize.height - targetRect.bottom - 10 < popSize.height) keys[0] = 'top'
      } else if (keys[0] === 'left') {
        if (targetRect.left - 10 < popSize.width) keys[0] = 'rigth'
      } else if (keys[0] === 'right') {
        if (windowSize.width - targetRect.right - 10 < popSize.width) keys[0] = 'left'
      }

      if (keys[0] === 'left' || keys[0] === 'right') {
        if (keys[1] === 'bottom') {
          if (targetRect.top - 10 < (popSize.height - targetSize.height)) keys[1] = 'top'
        } else if (keys[1] === 'top') {
          if (windowSize.height - targetRect.bottom - 10 < (popSize.height - targetSize.height)) keys[1] = 'bottom'
        } else if (keys[1] === 'middle') {
          let bottomSpace = windowSize.height - targetRect.bottom - 10
          let topSpace = targetRect.top - 10
          let halfSize = popSize.height / 2 - targetSize.height
          let min = Math.min(bottomSpace, topSpace, halfSize)
          let max = Math.max(bottomSpace, topSpace, halfSize)
          if (min !== halfSize && max !== halfSize) {
            if (min === topSpace) keys[1] = 'top'
            else keys[1] = 'bottom'
          }
        }
      }

      if (keys[0] === 'top' || keys[0] === 'bottom') {
        if (keys[1] === 'right') {
          if (targetRect.left - 10 < (popSize.width / (keys[1] === 'center' ? 2 : 1) - targetSize.width)) keys[1] = 'left'
        } else if (keys[1] === 'left') {
          if (windowSize.width - targetRect.right - 10 < (popSize.width - targetSize.width)) keys[1] = 'right'
        } else if (keys[1] === 'center') {
          let leftSpace = targetRect.left - 10
          let rightSpace = windowSize.width - targetRect.right - 10
          let halfSize = popSize.width / 2 - targetSize.width
          let min = Math.min(leftSpace, rightSpace, halfSize)
          let max = Math.max(leftSpace, rightSpace, halfSize)
          if (min !== halfSize && max !== halfSize) {
            if (min === leftSpace) keys[1] = 'left'
            else keys[1] = 'right'
          }
        }
      }

      this.localPlacement = keys.join(' ')

      // fix the size bug witch caused by the wordwrap
      // this.__pop.style.width = popSize.width + 'px'
      // this.__pop.style.height = popSize.height + 'px'
      let offset = 10
      let vertical = {
        x: {
          left: targetRect.left + parseInt(this.xFix),
          center: targetRect.left + targetSize.width / 2 - popSize.width / 2 + parseInt(this.xFix),
          right: targetRect.left + targetSize.width - popSize.width + parseInt(this.xFix)
        },
        y: {
          top: targetRect.top - popSize.height - offset + parseInt(this.yFix),
          bottom: targetRect.top + targetSize.height + offset + parseInt(this.yFix) // do not kown why should add 10 but it works
        }
      }
      let horizontal = {
        x: {
          left: targetRect.left - offset - popSize.width + parseInt(this.xFix),
          right: targetRect.left + targetSize.width + offset + parseInt(this.xFix)
        },
        y: {
          top: targetRect.top + parseInt(this.yFix),
          middle: targetRect.top + targetSize.height / 2 - popSize.height / 2 + parseInt(this.yFix),
          bottom: targetRect.top + targetSize.height - popSize.height + 11 + parseInt(this.yFix) // do not kown why should add 11 but it works
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
