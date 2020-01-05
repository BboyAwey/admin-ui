<style lang="scss" scoped>
.paragraph {
  font-size: 14px;
  line-height: 24px;
}
.paragraph:not(:last-child) {
    margin-bottom: 12px;
}
</style>

<template>
  <p class="paragraph">
    <slot></slot>
  </p>
</template>

<script>
export default {
  name: 'doc-p'
}
</script>
