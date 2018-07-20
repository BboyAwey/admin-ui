<style lang="scss">
  @import "../../../style/vars";
  .au-panel {
    border-width: 1px;
    border-style: solid;
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
    .au-panel-title-icon {
      position: relative;
      float: left;
      bottom: -2px;
      padding-right: 4px;
      vertical-align: middle;
    }
    .au-panel-title-text {
      display: inline-block;
      max-width: 100%;
      overflow: hidden;
      vertical-align: middle;
    }
    .au-panel-title-right {
      vertical-align: middle;
      float: right;
    }
    .au-panel-title:after {
      content: "";
      display: block;
      clear: both;
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
      au-theme-border-color--base-10
      au-theme-color--base-3
      au-theme-border-radius--large
      ">
    <h3 v-if="title"
      class="
        au-panel-title
        au-theme-border-color--base-10
        au-theme-color--base-3">
        <au-icon class="au-panel-title-icon" v-if="icon" :type="icon"></au-icon>
        <span class="au-panel-title-text">{{ title }}</span>
        <span class="au-panel-title-right"><slot name="title-right"></slot></span>
    </h3>
    <div class="au-panel-content au-theme-color--base-3">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'au-panel',
  props: {
    title: String,
    icon: String
  }
}
</script>
