<style lang="scss" scoped>
  .section:not(:last-child) {
    margin-bottom: 20px;
  }
</style>

<template>
  <au-panel class="section" title="组件描述">
    <slot></slot>
  </au-panel>
</template>

<script>
export default {
  name: 'doc-section',
  props: {
    title: String
  }
}
</script>
