<style lang="scss">
  @import '../../../style/vars';
  .au-button {
    position: relative;
    min-width: 88px;
    height: 32px;
    padding: 0 16px;
    border: 0;
    outline: none;
    font-size: $normal;
    line-height: 32px;
    cursor: pointer;
    font-family: $fontFamily;
  }
</style>
<template>
  <button class="
    au-button
    au-theme-background-color--primary
    au-theme-radius--true
    au-theme-font-color--base-5">theme!!!</button>
</template>
<script>
  export default {
    name: 'au-button',
    data () {
      return {}
    },
    computed: {
      buttonClasses () {}
    }
  }
</script>


