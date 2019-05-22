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
      default: 'both'
    },
    scrollTop: {
      type: [Number, String],
      default: 0
    },
    scrollLeft: {
      type: [Number, String],
      default: 0
    }
  },
  data () {
    return {
    }
  },
  watch: {
  },
  methods: {
  }
}
</script>
