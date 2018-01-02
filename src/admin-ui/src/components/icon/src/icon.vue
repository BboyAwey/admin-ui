<style lang="scss">
  .au-icon {
    text-align: center;
  }
</style>
<template>
  <i class="au-icon"
    :class="'fa fa-' + type"
    aria-hidden="true"
    @click="$emit('click')"
    :style="{
      fontSize: size,
      color
    }"></i>
</template>
<script>
  import '../../../style/font-awesome/style.css'
  export default {
    name: 'au-icon',
    mounted () {
      if (this.unifySize) this.setUnifiedWidth()
    },
    props: {
      type: {
        type: String
      },
      size: {
        type: String
      },
      color: {
        type: String
      },
      unifySize: Boolean
    },
    watch: {
      size (v) {
        if (this.unifySize) this.$nextTick(this.setUnifiedWidth)
      },
      unifySize (v) {
        if (v) this.$nextTick(this.setUnifiedWidth)
      }
    },
    methods: {
      setUnifiedWidth () {
        this.$el.style.width = parseInt(window.getComputedStyle(this.$el).fontSize) + 4 + 'px'
      }
    }
  }
</script>



