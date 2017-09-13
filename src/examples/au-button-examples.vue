<style lang="scss">
.global-style {
  padding: 40px;
}
</style>
<template>
  <div class="global-style">
    <au-button>{{ test }}</au-button>
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
