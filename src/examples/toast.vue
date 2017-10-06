<style lang="scss" scoped>

</style>
<template>
  <div class="page">
    <au-button @click="toast({
      message: 'Toast Me!'
    })">Toast me</au-button>
    <au-button @click="toast({
      message: 'Toast Me Too!',
      icon: 'info-circle',
      iconClass: 'au-theme-font-color--danger-3'
    })">Toast me</au-button>
    <au-button @click="toast({
      message: 'Toast Me Too!',
      icon: 'info-circle',
      iconClass: 'au-theme-font-color--danger-3',
      top: 100,
      left: 100
    })">Toast me</au-button>
  </div>
</template>
<script>
  export default {
    name: 'toast-examples',
    methods: {
      toast (config) {
        this.$toast(config)
      }
    }
  }
</script>

