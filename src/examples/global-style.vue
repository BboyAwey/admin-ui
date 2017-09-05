<style lang="scss">
.global-style {

}
</style>
<template>
  <div class="global-style">
    {{ test }}
  </div>
</template>
<script>
  export default {
    name: 'global-style',
    data () {
      return {
        test: 'hello world~'
      }
    }
  }
</script>
