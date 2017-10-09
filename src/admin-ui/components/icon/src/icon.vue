<style lang="scss">
  .au-icon {}
</style>
<template>
  <i class="au-icon"
    :class="'fa fa-' + type"
    aria-hidden="true"
    :style="{
      fontSize: size,
      color
    }"></i>
</template>
<script>
  import '../../../style/font-awesome/css/font-awesome.min.css'
  export default {
    name: 'au-icon',
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
    }
  }
</script>



