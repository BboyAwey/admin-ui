<style lang="scss">
  .au-grid-container {
    display: flex;
    flex-wrap: wrap;
  }
</style>

<template>
  <div class="au-grid-container">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'au-grid-container'
  }
</script>
