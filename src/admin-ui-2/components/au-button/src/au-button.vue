<style lang="scss">
  @import '../../../style/vars.scss';
  .au-button {
    position: relative;
    min-width: 88px;
    height: 32px;
    padding: 0 16px;
    // border-radius: 2px;
    border: 0;
    outline: none;
    // background: none;
    // color: #fff;
    font-size: $normal;
    line-height: 32px;
    cursor: pointer;
    font-family: $fontFamily;
    transition: box-shadow .2s ease;
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


