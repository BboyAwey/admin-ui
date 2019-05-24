<style lang="scss">
  .au-scroller {
    position: relative;
    overflow: hidden;
  }
  .au-scroller-wrapper {
    width: 100%;
    height: 100%;
    max-height: 100%;
  }
</style>
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
    this.scroller.destroy()
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
    }
  },
  watch: {
    direction (v) {
      this.scroller.setDirection(v)
    },
    scrollTop (v) {
      this.scroller.scrollTo({ scrollTop: v })
    },
    scrollLeft (v) {
      this.scroller.scrollTo({ scrollLeft: v })
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
