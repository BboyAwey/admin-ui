<template>
  <div class="page">
    <au-panel class="section" title="Todo List 【置顶】">
      <ol class="option-list">
        <li class="au-theme-border-color--base-8">目前表格组件仅是样式，无任何功能封装，需要重构表格组件</li>
        <li class="au-theme-border-color--base-8">新增标签页的第二种样式</li>
        <li class="au-theme-border-color--base-8">完善开发者文档</li>
      </ol>
    </au-panel>
    <au-panel class="section" title="3.1.6">
      <h3 class="title-1">## 特性变更</h3>
      <ol class="option-list">
        <li class="au-theme-border-color--base-8">简化主体系统配置项，增强相关色的名称语义，现在无彩色和相关色已经不需要配置了，系统会自动计算</li>
        <li class="au-theme-border-color--base-8">栅格系统增加间距支持</li>
      </ol>
    </au-panel>
    <au-panel class="section" title="3.1.3">
      <h3 class="title-1">## 新增特性</h3>
      <ol class="option-list">
        <li class="au-theme-border-color--base-8">rangepicker的range新增relative选项用于保存相对时间</li>
      </ol>
      <h3 class="title-2">## Bug Fixed</h3>
      <ol class="option-list">
        <li class="au-theme-border-color--base-8">menu现在会响应route的变化自动定位当前项</li>
        <li class="au-theme-border-color--base-8">breadcrumbs点击链接仅触发事件而不再处理crumbs</li>
        <li class="au-theme-border-color--base-8">修复tree组件半选与选择状态不准确问题</li>
      </ol>
    </au-panel>
    <au-panel class="section" title="3.1.2">
      <h3 class="title-1">## 新增特性</h3>
      <ol class="option-list">
        <li class="au-theme-border-color--base-8">tagfactory新增loading接口</li>
      </ol>
      <h3 class="title-2">## Bug Fixed</h3>
      <ol class="option-list">
        <li class="au-theme-border-color--base-8">修正popover自动回避屏幕边缘不准问题</li>
        <li class="au-theme-border-color--base-8">修正modal点击蒙层关闭自身的条件，允许内部点击事件冒泡</li>
        <li class="au-theme-border-color--base-8">修正tagfactory气泡失焦后未关闭无法关闭问题</li>
      </ol>
    </au-panel>
    <au-panel class="section" title="3.1.0">
      <h3 class="title-1">## 新增特性</h3>
      <ol class="option-list">
        <li class="au-theme-border-color--base-8">新增tagfactory组件，详见<router-link class="au-theme-color--info" :to="{path: '/tagfactory'}" target="_blank">tagfactory</router-link></li>
      </ol>
      <h3 class="title-2">## Bug Fixed</h3>
      <ol class="option-list">
        <li class="au-theme-border-color--base-8">修正input关联项不响应输入</li>
        <li class="au-theme-border-color--base-8">去除表单类组件横排时label的冒号</li>
        <li class="au-theme-border-color--base-8">修正rangepicker选中相对时间后不回填绝对时间</li>
        <li class="au-theme-border-color--base-8">修正rangepicker弹层定位不准问题</li>
        <li class="au-theme-border-color--base-8">修正datepicker start和end计算不准问题</li>
        <li class="au-theme-border-color--base-8">checkbox半选状态解除与值的关联</li>
      </ol>
    </au-panel>
    <au-panel class="section" title="3.0.0">
      <h3 class="title-1">## 特性变更</h3>
      <ol class="option-list">
        <li class="au-theme-border-color--base-8">Theme system: shadow style and radius class name changed, add values on radius</li>
        <li class="au-theme-border-color--base-8">Toast组件变更为Message组件，其接口也有变更，详见组件文档</li>
        <li class="au-theme-border-color--base-8">previewer、modal组件display接口变更为visible</li>
        <li class="au-theme-border-color--base-8">button组件loading尺寸调整（实现更换为loading组件而非内置实现）</li>
      </ol>
      <h3 class="title-1">## 新增特性</h3>
      <ol class="option-list">
        <li class="au-theme-border-color--base-8">新增rangepicker组件，详见<router-link class="au-theme-color--info" :to="{path: '/rangepicker'}" target="_blank">rangepicker</router-link></li>
        <li class="au-theme-border-color--base-8">messageBox新增confirmText/cancelText选项</li>
        <li class="au-theme-border-color--base-8">icon新增custom接口，支持第三方css图标库</li>
        <li class="au-theme-border-color--base-8">loading组件新增size，mask接口用于自定义尺寸和是否显示遮罩</li>
        <li class="au-theme-border-color--base-8">switch新增loading接口显示加载状态</li>
        <li class="au-theme-border-color--base-8">表单组件新增inline接口用于横向显示；新增warning用于显示警告样式，warnings接口不再提供仅显示警告样式功能；新增labelWidth接口用于横向显示时控制label宽度进行对齐；新增tips接口用于显示说明信息</li>
        <li class="au-theme-border-color--base-8">input,select,cascading,datepicker,timepicker组件新增full-width接口更方便地进行宽度控制</li>
        <li class="au-theme-border-color--base-8">menu组件新增background-color/item-font-color/item-background-color/item-unlink-font-color/item-hover-font-color/item-hover-background-color/item-active-font-color/item-active-background-color/collapse-handlebar-seprator-color接口更方便地进行颜色定制</li>
        <li class="au-theme-border-color--base-8">popover组件新增自动回避屏幕边缘特性，在指定方向空间不足时会尝试反向显示</li>
        <li class="au-theme-border-color--base-8">message-box组件新增icon, messageType字段，可以设置图标了</li>
        <li class="au-theme-border-color--base-8">tag组件新增hoverable接口，指定tag是否响应鼠标hover交互</li>
        <li class="au-theme-border-color--base-8">input组件associations接口现在支持传入对象数组，同时新增association-select事件</li>
        <li class="au-theme-border-color--base-8">popover组件新增beforeShow接口</li>
      </ol>
      <h3 class="title-2">## Bug Fixed</h3>
      <ol class="option-list">
        <li class="au-theme-border-color--base-8">timepicker popover should scroll to 00:00:00 if the value is 00:00:00</li>
        <li class="au-theme-border-color--base-8">fix the condition of a menu item been the current item</li>
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
