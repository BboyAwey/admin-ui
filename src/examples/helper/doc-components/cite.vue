<style lang="scss" scoped>
  .cite {
    display: block;
    position: relative;
    font-size: 12px;
    line-height: 20px;
    padding: 12px 12px 12px 24px;
    margin: 12px 0;
  }
</style>

<template>
  <cite class="cite au-theme-before-background-color--base-8 au-theme-color--base-5">
    <slot></slot>
  </cite>
</template>

<script>
export default {
  name: 'doc-cite'
}
</script>
