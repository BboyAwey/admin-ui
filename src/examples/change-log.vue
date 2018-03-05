<template>
  <div class="page">
    <au-panel class="section" title="3.0.0">
      <h3 class="title-1">## 特性变更</h3>
      <ol class="option-list">
        <li class="au-theme-border-color--base-8">Theme system: shadow style and radius class name changed, add values on radius</li>
        <li class="au-theme-border-color--base-8">Toast组件变更为Message组件，其接口也有变更，详见组件文档</li>
        <li class="au-theme-border-color--base-8">previewer、modal组件display接口变更为visible</li>
      </ol>
      <h3 class="title-1">## 新增特性</h3>
      <ol class="option-list">
        <li class="au-theme-border-color--base-8">新增rangepicker组件，详见<router-link class="au-theme-font-color--info-3" :to="{path: '/rangepicker'}" target="_blank">rangepicker</router-link></li>
        <li class="au-theme-border-color--base-8">messageBox新增confirmText/cancelText选项</li>
        <li class="au-theme-border-color--base-8">icon新增custom接口，支持第三方css图标库</li>
        <li class="au-theme-border-color--base-8">loading组件新增size，mask接口用于自定义尺寸和是否显示遮罩</li>
        <li class="au-theme-border-color--base-8">switch新增loading接口显示加载状态</li>
        <li class="au-theme-border-color--base-8">表单组件新增inline接口用于横向显示；新增warning用于显示警告样式，warnings接口不再提供仅显示警告样式功能；新增labelWidth接口用于横向显示时控制label宽度进行对齐；新增tips接口用于显示说明信息</li>
        <li class="au-theme-border-color--base-8">input,select,cascading,datepicker,timepicker组件新增full-width接口更方便地进行宽度控制</li>
        <li class="au-theme-border-color--base-8">menu组件新增background-color/item-font-color/item-background-color/item-unlink-font-color/item-hover-font-color/item-hover-background-color/item-active-font-color/item-active-background-color/collapse-handlebar-seprator-color接口更方便地进行颜色定制</li>
        <li class="au-theme-border-color--base-8">popover组件新增自动回避屏幕边缘特性，在指定方向空间不足时会尝试反向显示</li>
      </ol>
      <h3 class="title-2">## Bug Fixed</h3>
      <ol class="option-list">
        <li class="au-theme-border-color--base-8">timepicker popover should scroll to 00:00:00 if the value is 00:00:00</li>
      </ol>
    </au-panel>
    <au-panel class="section" title="2.2.24">
      <p class="paragraph">
        <ol class="option-list">
          <li class="au-theme-border-color--base-8">简化安装方式，不再需要webpack alias</li>
          <li class="au-theme-border-color--base-8">正式支持按需加载</li>
          <li class="au-theme-border-color--base-8">新增黑色主题'dark'</li>
        </ol>
      </p>
    </au-panel>
  </div>
</template>
<script>
  export default {
    name: 'change-log'
  }
</script>

