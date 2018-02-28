<style lang="scss">
  @import '../style/vars';
  @import '../style/label';
  @import '../style/size';
  @import '../style/warnings';
  .au-form-item {
    // display: inline-block;
    font-size: $normal;
  }
  .au-form-item-main-block {
    display: block;
  }
  .au-form-item-main-inline {
    display: inline-block;
    vertical-align: top;
  }
</style>
<template>
  <div class="au-form-item">
    <div
      class="au-theme-font-color--base-3"
      :class="{
        [`au-form-label${inline ? '-inline' : ''}`]: true,
        [`au-size-${size}`]: inline && middle
      }"
      v-if="label"
      :style="{
        width: inline ? labelWidth : ''
      }">{{ label }}</div>
    <div :class="`au-form-item-main${inline ? '-inline' : '-block'}`">
      <slot></slot>
      <div class="au-form-warning au-theme-font-color--danger-3" v-for="(warning, i) in warnings" :key="i">{{ warning }}</div>
      <div class="au-form-warning au-theme-font-color--base-7" v-for="(comment, i) in comments" :key="i">{{ comment }}</div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'au-form-item',
    props: {
      label: String,
      inline: Boolean,
      comments: Array,
      warnings: [Array, Object],
      labelWidth: String,
      size: {
        type: String,
        default: 'normal'
      },
      middle: Boolean
    }
  }
</script>
