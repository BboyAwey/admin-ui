<style lang="scss">
  .au-scroller {
    position: relative;
    overflow: hidden;
  }
  .au-scroller-content {
    position: relative;
    width: 100%;
    top: 0;
    left: 0;
    transition: top .2s ease-out;
  }
  .au-scroller-bar-container,
  .au-scroller-bar,
  .au-scroller-bar-core {
    position: absolute;
    top: 0;
  }
  .au-scroller-bar-container {
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
    transition-duration: .2s;
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
  <div class="au-scroller" :style="{ height }"
    @mouseover="handleMouseover"
    @mouseout="handleMouseout"
    ref="monitor">
    <div class="au-scroller-content" ref="content" :style="{ top: contentTop + 'px' }" :class="{ 'au-no-select': onDrag }">
      <slot></slot>
    </div>
    <div class="au-scroller-bar-container"
      @mouseover="handleBarMouseover"
      @mouseout="handleBarMouseout"
      v-show="needScroll"
      ref="barContainer">
      <div class="au-scroller-bar au-theme-background-color--base-1" ref="bar" @click="handleBarClick"></div>
      <div
        class="au-scroller-bar-core au-theme-background-color--base-1"
        ref="core"
        :style="{ top: scrollTop + 'px', height: coreHeight + 'px' }"
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
      mousewheel('add', this.$refs.monitor, (e) => {
        if (!this.needScroll) return
        let direction = e.deltaY || e.detail // chrome,edge / firefox
        this.handleScroll((direction < 0 ? -direction : direction) / direction)
        if (this.scrollEnd) return
        else e.stopPropagation()
      })
      window.addEventListener('resize', this.handlerResize)
    },
    destroyed () {
      window.removeEventListener('resize', this.handlerResize)
    },
    props: {
      height: {
        required: true,
        type: String
      }
    },
    data () {
      return {
        step: 100,
        contentTop: 0,
        scrollTop: 0,
        coreHeight: 0,
        diff: 0,
        onDrag: false,
        onOver: false,
        scrollEnd: false,
        needScroll: false
      }
    },
    methods: {
      handleScroll (direction) {
        this.setContentTop(this.contentTop - direction * this.step)
      },
      setContentTop (v) {
        let monitorHeight = this.getMonitorHeight()
        let contentHeight = getElementSize(this.$refs.content).height
        let contentTopMin = monitorHeight - contentHeight
        let contentTop = v

        this.scrollEnd = contentTop >= 0 || contentTop <= contentTopMin

        contentTop = contentTop >= 0 ? 0 : (contentTop <= contentTopMin ? contentTopMin : contentTop)

        this.contentTop = contentTop

        // sync scrollbar
        let scrollTopMax = getElementSize(this.$refs.bar).height - getElementSize(this.$refs.core).height
        let scrollTop = contentTop * monitorHeight / contentHeight * -1
        this.scrollTop = scrollTop <= 0 ? 0 : (scrollTop >= scrollTopMax ? scrollTopMax : scrollTop)
        // fix
        if (this.contentTop <= contentTopMin) this.scrollTop = scrollTopMax
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
        } else {
          this.needScroll = true
          this.coreHeight = monitor * monitor / content
        }
      },
      handleMouseover () {
        this.$refs.bar.style.opacity = '.3'
        this.$refs.core.style.opacity = '.5'
        this.calcCoreHeight(
          getElementSize(this.$refs.monitor).height,
          getElementSize(this.$refs.content).height
        )
      },
      handleMouseout () {
        if (!this.onDrag) {
          this.$refs.bar.style.opacity = 0
          this.$refs.core.style.opacity = 0
        }
      },
      handleBarMouseover () {
        this.onOver = true
        this.$refs.bar.style.width = '12px'
        this.$refs.core.style.width = '12px'
      },
      handleBarMouseout () {
        this.onOver = false
        if (!this.onDrag) {
          this.$refs.bar.style.width = '6px'
          this.$refs.core.style.width = '6px'
        }
      },
      handleCoreMousedown (e) {
        this.onDrag = true
        this.diff = e.pageY - this.$refs.core.getBoundingClientRect().top
        window.addEventListener('mousemove', this.handleMousemove)
        window.addEventListener('mouseup', this.handleCoreMouseUp)
      },
      handleMousemove (e) {
        e.preventDefault()
        this.setScrollTop(e.pageY - this.diff - this.$refs.bar.getBoundingClientRect().top)
      },
      handleCoreMouseUp () {
        this.onDrag = false
        window.removeEventListener('mousemove', this.handleMousemove)
        window.removeEventListener('mouseup', this.handleCoreMouseUp)
        if (!this.onOver) {
          this.$refs.bar.style.width = '6px'
          this.$refs.core.style.width = '6px'
        }
      },
      handleBarClick (e) {
        let mouseY = e.pageY
        let barY = this.$refs.bar.getBoundingClientRect().top
        let coreHeight = this.coreHeight

        this.setScrollTop(mouseY - barY - coreHeight / 2)
      },
      setScrollTop (v) {
        let barHeight = getElementSize(this.$refs.bar).height
        let coreHeight = getElementSize(this.$refs.core).height
        let monitorHeight = this.getMonitorHeight()
        let contentHeight = getElementSize(this.$refs.content).height

        let scrollTopMax = barHeight - coreHeight
        let contentTopMax = monitorHeight - contentHeight

        let scrollTop = v
        scrollTop = scrollTop <= 0 ? 0 : (scrollTop >= scrollTopMax ? scrollTopMax : scrollTop)

        this.scrollEnd = scrollTop <= 0 || scrollTop >= scrollTopMax

        let contentTop = scrollTop * contentHeight / barHeight * -1
        contentTop = contentTop >= 0 ? 0 : (contentTop <= contentTopMax ? contentTopMax : contentTop)

        this.scrollTop = scrollTop
        this.contentTop = scrollTop >= scrollTopMax ? contentTopMax : contentTop
      },
      handlerResize () {
        this.setScrollTop(this.scrollTop)
      }
    }
  }
</script>
