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
      this.setUnifiedWidth()
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
      }
    },
    watch: {
      size (v) {
        this.$nextTick(this.setUnifiedWidth)
      }
    },
    methods: {
      setUnifiedWidth () {
        this.$el.style.width = window.getComputedStyle(this.$el).fontSize
      }
    }
  }
</script>



