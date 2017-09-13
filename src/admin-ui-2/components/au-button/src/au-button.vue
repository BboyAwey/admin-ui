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
  <button :class="buttonClasses">
      <slot></slot>
  </button>
</template>
<script>
  export default {
    name: 'au-button',
    data () {
      return {}
    },
    props: {
      type: 'default'
    },
    computed: {
      buttonClasses () {
        let color = (this.type === 'default' || !this.type) ? 'base-3' : this.type
        return `
          au-button
          au-theme-background-color--${color}
          au-theme-radius
          au-theme-font-color--base-12`
      }
    }
  }
</script>


