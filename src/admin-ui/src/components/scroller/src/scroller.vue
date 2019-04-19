<style lang="scss">
  .au-scroller {
    position: relative;
    overflow: hidden;
  }
  .au-scroller-inner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: scroll;
    padding-right: 50px;
  }
  .au-scroller-bar-container,
  .au-scroller-bar,
  .au-scroller-bar-core {
    position: absolute;
    top: 0;
  }
  .au-scroller-bar-container {
    top: 10px;
    right: 52px;
    width: 12px;
    height: 100%;
  }
  .au-scroller-bar,
  .au-scroller-bar-core {
    right: 1px;
    width: 3px;
    height: 100%;
    border-radius: 6px;
    opacity: .2;
    transition-property: transform, width, opacity;
    transition-duration: .3s;
    transition-timing-function: ease-out;
    cursor: pointer;
  }
  .au-scroller-bar-core {
     opacity: .4;
  }
  .au-no-select * {
    user-select: none;
  }
</style>
<template>
  <div class="au-scroller"
    @mouseenter="handleMouseenter"
    @mouseleave="handleMouseleave"
    ref="monitor">
    <div class="au-scroller-inner">
      <div
        class="au-scroller-content"
        ref="content"
        :class="{ 'au-no-select': onDrag }">
        <slot></slot>
      </div>
      <div class="au-scroller-bar-container"
        @mouseenter="handleBarMouseenter"
        @mouseleave="handleBarMouseleave"
        v-show="(mouseenter && needScroll) || onDrag"
        ref="barContainer">
        <div class="au-scroller-bar au-theme-background-color--base-0" ref="bar" @click="handleBarClick"></div>
        <div
          class="au-scroller-bar-core au-theme-background-color--base-0"
          ref="core"
          :style="{ transform:  `translateY(${coreTop}px)`, height: coreHeight + 'px' }"
          @mousedown="handleCoreMousedown"
          @mouseup="handleCoreMouseUp"></div>
    </div>
    </div>
  </div>
</template>
<script>
import getElementSize from '../../../helpers/dom/get-element-size'
import { addListener, removeListener } from 'resize-detector'

export default {
  name: 'au-scroller',
  mounted () {
    addListener(this.$refs.content, this.handlerResize)
  },
  beforeDestroy () {
    removeListener(this.$refs.content, this.handlerResize)
  },
  props: {
    scrollTop: {
      type: [Number, String],
      default: 0
    },
    stopPropagation: Boolean,
    hidePopovers: Boolean
  },
  data () {
    return {
      step: 1,
      coreTop: 0,
      coreHeight: 0,
      diff: 0,
      onDrag: false,
      onOver: false,
      needScroll: false,
      clock: null,
      mouseenter: false
    }
  },
  watch: {
    scrollTop (v) {
      if (this.contentTop !== v * -1) this.setContentTop(-v)
    },
    contentTop (v) {
      if (!this.$root._auPopovers) this.$root._auPopovers = {}
      if (this.hidePopovers) Object.values(this.$root._auPopovers).forEach(pop => pop.hide())
      this.$emit('scroll', v * -1 || 0)
    },
    needScroll (v) {
      if (!v) this.contentTop = 0
    }
  },
  methods: {
    detectIfNeedScroll () {
      let monitorHeight = this.getMonitorHeight()
      let contentHeight = getElementSize(this.$refs.content).height
      this.needScroll = monitorHeight < contentHeight
      return {
        needScroll: this.needScroll,
        monitorHeight,
        contentHeight
      }
    },
    setContentTop (v) {
      let { needScroll, monitorHeight, contentHeight } = this.detectIfNeedScroll()
      if (!needScroll) return
      let contentTopMin = monitorHeight - contentHeight
      let contentTop = parseInt(v)

      contentTop = contentTop >= 0 ? 0 : (contentTop <= contentTopMin ? contentTopMin : contentTop)
      this.contentTop = contentTop

      // sync scrollbar
      let scrollTopMax = getElementSize(this.$refs.bar).height - getElementSize(this.$refs.core).height
      let coreTop = contentTop * monitorHeight / contentHeight * -1
      this.coreTop = coreTop <= 0 ? 0 : (coreTop >= scrollTopMax ? scrollTopMax : coreTop)
      // fix
      if (this.contentTop <= contentTopMin) this.coreTop = scrollTopMax
    },
    getMonitorHeight () {
      let {paddingTop, paddingBottom, borderTopWidth, borderBottomWidth} = window.getComputedStyle(this.$refs.monitor)
      return getElementSize(this.$refs.monitor).height -
        parseInt(paddingTop) - parseInt(paddingBottom) -
        parseInt(borderTopWidth) -
        parseInt(borderBottomWidth)
    },
    calcCoreHeight (monitor, content) {
      if (content <= monitor) {
        this.needScroll = false
        this.contentTop = 0
      } else {
        this.needScroll = true
        let barHeight = getElementSize(this.$refs.barContainer).height
        this.coreHeight = monitor * barHeight / content
      }
    },
    setBarHeight (monitor) {
      this.$refs.barContainer.style.height = monitor - 20 + 'px'
    },
    handleMouseenter () {
      this.mouseenter = true
      this.$refs.bar.style.opacity = '.2'
      this.$refs.core.style.opacity = '.4'
      this.$refs.bar.style.borderRadius = '3px'
      this.$refs.core.style.borderRadius = '3px'
      let monitorHeight = getElementSize(this.$refs.monitor).height
      this.setBarHeight(monitorHeight)
      this.calcCoreHeight(
        monitorHeight,
        getElementSize(this.$refs.content).height,
        getElementSize(this.$refs.bar).height
      )
    },
    handleMouseleave () {
      this.mouseenter = false
      if (!this.onDrag) {
        this.$refs.bar.style.opacity = '0'
        this.$refs.core.style.opacity = '0'
      }
    },
    handleBarMouseenter () {
      this.onOver = true
      this.$refs.bar.style.width = '8px'
      this.$refs.core.style.width = '8px'
      this.$refs.bar.style.borderRadius = '6px'
      this.$refs.core.style.borderRadius = '6px'
    },
    handleBarMouseleave () {
      this.onOver = false
      if (!this.onDrag) {
        this.$refs.bar.style.width = '3px'
        this.$refs.core.style.width = '3px'
        this.$refs.bar.style.borderRadius = '3px'
        this.$refs.core.style.borderRadius = '3px'
      }
    },
    handleCoreMousedown (e) {
      e.preventDefault()
      e.stopPropagation()
      this.onDrag = true
      this.diff = e.pageY - this.$refs.core.getBoundingClientRect().top
      window.addEventListener('mousemove', this.handleMousemove)
      window.addEventListener('mouseup', this.handleCoreMouseUp)
      this.$refs.core.style.transitionDuration = '.1s'
      this.$refs.content.style.transitionDuration = '.1s'
    },
    handleMousemove (e) {
      e.preventDefault()
      e.stopPropagation()
      this.setScrollCoreTop(e.pageY - this.diff - this.$refs.bar.getBoundingClientRect().top)
    },
    handleCoreMouseUp (e) {
      e.preventDefault()
      e.stopPropagation()
      this.onDrag = false
      window.removeEventListener('mousemove', this.handleMousemove)
      window.removeEventListener('mouseup', this.handleCoreMouseUp)
      if (!this.onOver) {
        this.$refs.bar.style.width = '3px'
        this.$refs.core.style.width = '3px'
      }
      this.$refs.core.style.transitionDuration = '.3s'
      this.$refs.content.style.transitionDuration = '.3s'
    },
    handleBarClick (e) {
      let mouseY = e.pageY
      let barY = this.$refs.bar.getBoundingClientRect().top
      let coreHeight = this.coreHeight

      this.setScrollCoreTop(mouseY - barY - coreHeight / 2)
    },
    setScrollCoreTop (v) {
      let { needScroll, monitorHeight, contentHeight } = this.detectIfNeedScroll()
      if (!needScroll) return

      let barHeight = getElementSize(this.$refs.bar).height
      let coreHeight = getElementSize(this.$refs.core).height

      let scrollTopMax = barHeight - coreHeight
      let contentTopMax = monitorHeight - contentHeight

      let coreTop = v
      coreTop = coreTop <= 0 ? 0 : (coreTop >= scrollTopMax ? scrollTopMax : coreTop)

      let contentTop = coreTop * contentHeight / barHeight * -1
      contentTop = contentTop >= 0 ? 0 : (contentTop <= contentTopMax ? contentTopMax : contentTop)

      this.coreTop = coreTop
      this.contentTop = coreTop >= scrollTopMax ? contentTopMax : contentTop
    },
    handlerResize () {
      this.setScrollCoreTop(this.coreTop)
      this.$nextTick(this.handleMouseenter)
    }
  }
}
</script>
