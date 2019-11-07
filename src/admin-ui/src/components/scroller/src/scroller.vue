<template>
  <div class="au-scroller">
    <div ref='content'>
      <slot></slot>
    </div>
  </div>
</template>
<script>
import Scroller from '@awey/scroller'
const isFirefox = typeof navigator !== 'undefined' &&
  navigator.userAgent.toLowerCase().indexOf('firefox') > -1

export default {
  name: 'au-scroller',
  mounted () {
    this.scroller = new Scroller({
      el: this.$el,
      direction: this.direction,
      offset: this.offset,
      scaleable: this.scaleable,
      trackClassName: 'au-theme-background-color--base-0',
      barClassName: 'au-theme-background-color--base-0',
      fillHeight: true
    }).onScroll(e => {
      this.$emit('scroll', {
        scrollTop: e.target.scrollTop,
        scrollLeft: e.target.scrollLeft
      })
    })
  },
  beforeDestroy () {
    if (this.scroller) this.scroller.destroy()
  },
  props: {
    direction: {
      type: String,
      default: 'vertical'
    },
    scrollTop: {
      type: Number,
      default: 0
    },
    scrollLeft: {
      type: Number,
      default: 0
    },
    offset: {
      type: Number,
      default: 4
    },
    scaleable: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    direction (v) {
      this.scroller.setDirection(v)
    },
    /**
     * use timer to fix sync bug between prop value and scroller in firefox
     * in firefox the prop change will not completely sync to scroller
     * because firefox's render performance is not high enough to let scroll element complete the render when prop value changes too fast
     * and scroll element still will emit scroll value while it does not finish the scroll
     * so the output of scroll is not what we expected
     * so here we need to use timer to throttle it
     */
    scrollTop (v) {
      if (isFirefox) {
        if (!this.scrollTopTimer) {
          this.scrollTopTimer = setTimeout(() => {
            this.scroller && this.scroller.scrollTo({ scrollTop: v })
            clearTimeout(this.scrollTopTimer)
            this.scrollTopTimer = null
          }, 50)
        } else {
          clearTimeout(this.scrollTopTimer)
          this.scrollTopTimer = setTimeout(() => {
            this.scroller && this.scroller.scrollTo({ scrollTop: v })
            clearTimeout(this.scrollTopTimer)
            this.scrollTopTimer = null
          }, 50)
        }
      } else {
        this.scroller && this.scroller.scrollTo({ scrollTop: v })
      }
    },
    scrollLeft (v) {
      if (isFirefox) {
        if (!this.scrollLeftTimer) {
          this.scrollLeftTimer = setTimeout(() => {
            this.scroller && this.scroller.scrollTo({ scrollLeft: v })
            clearTimeout(this.scrollLeftTimer)
            this.scrollLeftTimer = null
          }, 50)
        } else {
          clearTimeout(this.scrollLeftTimer)
          this.scrollLeftTimer = setTimeout(() => {
            this.scroller && this.scroller.scrollTo({ scrollLeft: v })
            clearTimeout(this.scrollLeftTimer)
            this.scrollLeftTimer = null
          }, 50)
        }
      } else {
        this.scroller && this.scroller.scrollTo({ scrollLeft: v })
      }
    }
  },
  methods: {
    scrollTo (v) {
      this.scroller && this.scroller.scrollTo(v)
      if (v === 0 || v === '0') {
        this.$forceUpdate()
      }
    }
  }
}
</script>
