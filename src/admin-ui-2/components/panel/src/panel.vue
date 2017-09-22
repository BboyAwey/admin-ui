<style lang="scss">
  @import "../../../style/vars";
  .au-panel {
    // border: 1px solid $grayBrighten15;
    // background-color: #fff;
    // box-shadow: $shadowLevel3;
    .au-panel-title {
      border-bottom-width: 1px;
      border-bottom-style: solid;
      // margin-bottom: 24px;
      padding: 24px;
      font-size: $large;
      font-weight: bold;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .au-panel-content {
      padding: 24px;
    }
  }
</style>
<template>
  <div
    class="
      au-panel
      au-theme-background-color--base-12
      au-theme-font-color--base-3
      au-theme-radius
      au-theme-shadow--level-1">
    <h3 v-if="title"
      class="
        au-panel-title
        au-theme-border-color--base-8
        au-theme-font-color--base-3">
        {{ title }}
    </h3>
    <div class="au-panel-content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'au-panel',
    props: {
      title: String
    }
  }
</script>
