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
      class="au-theme-color--base-3"
      :class="{
        [`au-form-label${inline ? '-inline' : ''}`]: true,
        [`au-size-${size}`]: inline && middle
      }"
      v-if="label"
      :style="{
        width: inline ? labelWidth : '',
        lineHeight
      }">{{ label }}</div>
    <div :class="`au-form-item-main${inline ? '-inline' : '-block'}`">
      <slot></slot>
      <div class="au-form-warning au-theme-color--danger" v-for="(warning, i) in warnings" :key="warning + '' + i">{{ warning }}</div>
      <div class="au-form-warning au-theme-color--base-8" v-for="(tip, i) in tips" :key="tip + '' + i">{{ tip }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'au-form-item',
  props: {
    label: String,
    inline: Boolean,
    tips: Array,
    warnings: [Array, Object],
    labelWidth: String,
    size: {
      type: String,
      default: 'normal'
    },
    middle: Boolean,
    lineHeight: String
  }
}
</script>
