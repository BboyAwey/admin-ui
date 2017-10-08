<style lang="scss" scoped>
  @import "../style/common";
</style>
<template>
  <div class="page">
    <au-panel class="section">
      <p class="paragraph">
        Admin UI 2使用样式类来构建主题系统。
      </p>
      <cite class="cite au-theme-before-background-color--base-8 au-theme-font-color--base-5">
        Admin UI 2所有组件中与颜色相关的样式现在都通过诸如<span class="code au-theme-radius au-theme-background-color--warning-5">.au-theme-background--primary-3</span>这样的样式类来控制。我们设计了一套简单的规则来使用它们，并使得动态切换主题变得十分便捷，但代价便是在颜色一类的样式使用上存在很多限制，需要你适应它，同时发挥创造力在这套规则的限制下创造出同样丰富的颜色。
      </cite>
      <h4 class="title-1">自定义主题</h4>
      <p class="paragraph">
        Admin UI 2提供了<span class="code au-theme-radius au-theme-background-color--warning-5">.theme()</span>方法来让开发者和用户动态更换主题
      </p>
      <code-h lang="js">
        // 可接受的所有配置
        import AdminUi from 'admin-ui'
        AdminUi.theme({
          colors: {
            'base-0': '#000',
            'base-1': '#3c4147',
            'base-2': '#575e66',
            'base-3': '#757f8a ',
            'base-4': '#8b97a3',
            'base-5': '#a4b0bc',
            'base-6': '#b4bdc8',
            'base-7': '#cbd1d9',
            'base-8': '#d8dde6',
            'base-9': '#e6ecf2',
            'base-10': '#eef5f9',
            'base-11': '#f7fafb',
            'base-12': '#fff',

            'primary-1': '#042039',
            'primary-2': '#1c7dd2',
            'primary-3': '#1c86e2',
            'primary-4': '#1e8cee',
            'primary-5': '#c7e5ff',

            'info-1': '#062846',
            'info-2': '#2391d7',
            'info-3': '#32a2ea',
            'info-4': '#37aefa',
            'info-5': '#ceecff',

            'warning-1': '#322600',
            'warning-2': '#eea806',
            'warning-3': '#f5ae08',
            'warning-4': '#fab612',
            'warning-5': '#ffe9b2',

            'danger-1': '#400c10',
            'danger-2': '#e03743',
            'danger-3': '#ea3a46',
            'danger-4': '#f53e50',
            'danger-5': '#ffbcc2',

            'success-1': '#00301e',
            'success-2': '#0cae6c',
            'success-3': '#0cb470',
            'success-4': '#0ebc74',
            'success-5': '#ace6ce'
          },
          shadows: {
            'level-1': '0 1px 3px rgba(60, 65, 71, .5)',
            'level-2': '0 2px 4px rgba(60, 65, 71, .4)',
            'level-3': '0 3px 6px rgba(60, 65, 71, .3)',
            'primary': '0 1px 3px rgba(28, 134, 226, .5)',
            'info': '0 1px 3px rgba(50, 162, 234, .5)',
            'warning': '0 1px 3px rgba(245, 174, 8, .5)',
            'danger': '0 1px 3px rgba(234, 58, 70, .5)',
            'success': '0 1px 3px rgba(12, 180, 112, .5)'
          },
          borderRadius: false // 默认为true
        })
      </code-h>
    </au-panel>
  </div>
</template>
<script>
  export default {
    name: 'installtion'
  }
</script>
