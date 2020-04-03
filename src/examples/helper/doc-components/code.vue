<style lang="scss" scoped>
  .doc-code {
    display: inline-block;
    padding: 2px 4px;
    margin: 2px;
    font-size: 12px;
    vertical-align: middle;
  }
</style>

<template>
  <span class="doc-code au-theme-color--base-12 au-theme-background-color--base-8 au-theme-border-radius--small">
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: 'doc-code'
}
</script>
