<template>
  <div class="au-scroller">
    <div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
import Scroller from '@awey/scroller'

export default {
  name: 'au-scroller',
  mounted () {
    setTimeout(() => {
      this.scroller = new Scroller({
        el: this.$el,
        direction: this.direction,
        offset: this.offset,
        scaleable: this.scaleable,
        trackClassName: 'au-theme-background-color--base-0',
        barClassName: 'au-theme-background-color--base-0'
      }).onScroll(e => {
        this.$emit('scroll', {
          scrollTop: e.target.scrollTop,
          scrollLeft: e.target.scrollLeft
        })
      })
    }, 0)
  },
  beforeDestroy () {
    if (this.scroller) this.scroller.destroy()
  },
  // $emit scroll
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
      default: false
    }
  },
  watch: {
    direction (v) {
      this.scroller.setDirection(v)
    },
    scrollTop (v) {
      if (!this.scrollTopTimer) {
        this.scrollTopTimer = setTimeout(() => {
          this.scroller.scrollTo({ scrollTop: v })
          clearTimeout(this.scrollTopTimer)
          this.scrollTopTimer = null
        }, 100)
      } else {
        clearTimeout(this.scrollTopTimer)
        this.scrollTopTimer = setTimeout(() => {
          this.scroller.scrollTo({ scrollTop: v })
          clearTimeout(this.scrollTopTimer)
          this.scrollTopTimer = null
        }, 100)
      }
      // this.scroller.scrollTo({ scrollTop: v })
    },
    scrollLeft (v) {
      if (!this.scrollLeftTimer) {
        this.scrollLeftTimer = setTimeout(() => {
          this.scroller.scrollTo({ scrollLeft: v })
          clearTimeout(this.scrollLeftTimer)
          this.scrollLeftTimer = null
        }, 100)
      } else {
        clearTimeout(this.scrollLeftTimer)
        this.scrollLeftTimer = setTimeout(() => {
          this.scroller.scrollTo({ scrollLeft: v })
          clearTimeout(this.scrollLeftTimer)
          this.scrollLeftTimer = null
        }, 100)
      }
      // this.scroller.scrollTo({ scrollLeft: v })
    }
  },
  methods: {
    scrollTo (v) {
      this.scroller.scrollTo(v)
      if (v === 0 || v === '0') {
        this.$forceUpdate()
      }
    }
  }
}
</script>
