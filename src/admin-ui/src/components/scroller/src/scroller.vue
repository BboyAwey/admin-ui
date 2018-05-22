<style lang="scss">
  .au-scroller {
    // position: relative;
    overflow-y: hidden;
  }
  .au-scroller-content {
    position: relative;
    width: 100%;
    min-height: 100%;
    top: 0;
    left: 0;
    transition: top .3s ease-out;
  }
  .au-scroller-content:after {
    content: "";
    display: block;
    clear: both;
  }
  .au-scroller-bar-container,
  .au-scroller-bar,
  .au-scroller-bar-core {
    position: absolute;
    top: 0;
  }
  .au-scroller-bar-container {
    top: 10px;
    right: 2px;
    width: 12px;
    height: 100%;
  }
  .au-scroller-bar,
  .au-scroller-bar-core {
    right: 1px;
    width: 6px;
    height: 100%;
    border-radius: 12px;
    opacity: .3;
    transition-property: top, width, opacity;
    transition-duration: .3s;
    transition-timing-function: ease-out;
    cursor: pointer;
  }
  .au-scroller-bar-core {
     opacity: .5;
  }
  .au-no-select * {
    user-select: none;
  }
</style>
<template>
  <div class="au-scroller"
    @mouseenter="handleMouseenter"
    @mouseleave="handleMouseleave"
    @mousemove="handleScrollerMousemove"
    ref="monitor">
    <div
      class="au-scroller-content"
      ref="content"
      :style="{ top: contentTop + 'px' }"
      :class="{ 'au-no-select': onDrag }">
      <slot></slot>
    </div>
    <div class="au-scroller-bar-container"
      @mouseenter="handleBarMouseenter"
      @mouseleave="handleBarMouseleave"
      v-show="(mouseenter && needScroll) || onDrag"
      ref="barContainer">
      <div class="au-scroller-bar au-theme-background-color--base-1" ref="bar" @click="handleBarClick"></div>
      <div
        class="au-scroller-bar-core au-theme-background-color--base-1"
        ref="core"
        :style="{ top: scrollCoreTop + 'px', height: coreHeight + 'px' }"
        @mousedown="handleCoreMousedown"
        @mouseup="handleCoreMouseUp"></div>
    </div>
  </div>
</template>
<script>
import { getElementSize, mousewheel } from '../../../helpers/dom'

export default {
  name: 'au-scroller',
  mounted () {
    this.setPositionCss()
    // this.calcCoreHeight(
    //   getElementSize(this.$refs.monitor).height,
    //   getElementSize(this.$refs.content).height
    // )
    let firstScroll = true
    mousewheel('add', this.$refs.monitor, (e) => {
      if (firstScroll) {
        this.handleMouseenter()
        firstScroll = false
      }
      // if (!this.needScroll) return
      // let direction = e.deltaY || e.detail // chrome,edge / firefox
      let direction = e.deltaY ? e.deltaY : (e.detail * 10) // chrome,edge / firefox
      if (!direction) return
      // this.handleScroll((direction < 0 ? -direction : direction) / direction)
      let prev = this.contentTop
      this.handleScroll(direction)
      let next = this.contentTop
      if (this.stopPropagation || prev !== next) e.stopPropagation()
    })
    window.addEventListener('resize', this.handlerResize)
  },
  destroyed () {
    window.removeEventListener('resize', this.handlerResize)
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
      contentTop: this.scrollTop,
      scrollCoreTop: 0,
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
    setPositionCss () {
      let pos = window.getComputedStyle(this.$refs.monitor).position
      if (!pos || pos === 'static' || pos === 'inherit') {
        this.$refs.monitor.style.position = 'relative'
      }
    },
    handleScroll (direction) {
      this.setContentTop(this.contentTop - direction * this.step)
    },
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
      let scrollCoreTop = contentTop * monitorHeight / contentHeight * -1
      this.scrollCoreTop = scrollCoreTop <= 0 ? 0 : (scrollCoreTop >= scrollTopMax ? scrollTopMax : scrollCoreTop)
      // fix
      if (this.contentTop <= contentTopMin) this.scrollCoreTop = scrollTopMax
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
      this.$refs.bar.style.opacity = '.3'
      this.$refs.core.style.opacity = '.5'
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
    handleScrollerMousemove () {
      // this.needScroll = getElementSize(this.$refs.monitor).height < getElementSize(this.$refs.content).height
      // let vm = this
      // console.log('move')
      // if (vm.clock) return
      // else {
      //   vm.clock = setTimeout(function () {
      //     vm.needScroll = getElementSize(vm.$refs.monitor).height < getElementSize(vm.$refs.content).height
      //     clearTimeout(vm.clock)
      //     vm.clock = null
      //   }, 500)
      // }
    },
    handleBarMouseenter () {
      this.onOver = true
      this.$refs.bar.style.width = '12px'
      this.$refs.core.style.width = '12px'
    },
    handleBarMouseleave () {
      this.onOver = false
      if (!this.onDrag) {
        this.$refs.bar.style.width = '6px'
        this.$refs.core.style.width = '6px'
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
        this.$refs.bar.style.width = '6px'
        this.$refs.core.style.width = '6px'
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

      let scrollCoreTop = v
      scrollCoreTop = scrollCoreTop <= 0 ? 0 : (scrollCoreTop >= scrollTopMax ? scrollTopMax : scrollCoreTop)

      let contentTop = scrollCoreTop * contentHeight / barHeight * -1
      contentTop = contentTop >= 0 ? 0 : (contentTop <= contentTopMax ? contentTopMax : contentTop)

      this.scrollCoreTop = scrollCoreTop
      this.contentTop = scrollCoreTop >= scrollTopMax ? contentTopMax : contentTop
    },
    handlerResize () {
      this.setScrollCoreTop(this.scrollCoreTop)
    }
  }
}
</script>
