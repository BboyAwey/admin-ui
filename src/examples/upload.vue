<style lang="scss" scoped>
  // @import "../style/common";
</style>
<template>
  <div class="page">
    <au-upload v-model="files" action="http://127.0.0.1:3480/upload"></au-upload>
  </div>
</template>
<script>
  export default {
    name: 'upload-examples',
    data () {
      return {
        files: []
      }
    }
  }
</script>
