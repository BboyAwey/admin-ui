<template>
  <div class="page">
    <au-panel class="section">
      <p class="paragraph">
        推荐的安装方式是使用npm或cnpm进行安装：
      </p>
      <code-h lang="shell">
        cnpm install git+ssh://git@gitlab.dataengine.com:awey/admin-ui-2-publish.git --save
      </code-h>
      <p class="paragraph">
        安装完成后，可以选择按需加载组件或者全量加载：
      </p>
      <code-h lang="js">
        // 全量加载
        import Vue from 'vue'
        import AdminUi from 'admin-ui'
        Vue.use(AdminUi)
      </code-h>
      <code-h lang="js">
        // 按需加载
        import { AuIcon } from 'admin-ui' // 所有的组件名称前都有Au前缀
        export default {
          components: { AuIcon }
        }
      </code-h>
    </au-panel>
  </div>
</template>
<script>
  export default {
    name: 'installtion'
  }
</script>

