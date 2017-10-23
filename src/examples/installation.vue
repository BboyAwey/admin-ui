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
        安装完成后，可以选择按需加载组件或者全量加载。如果是全量加载，我们推荐在开发阶段直接加载源码，在上线时加载编译压缩后的版本：
      </p>
      <p class="paragraph">
        如果是全量加载，我们推荐在开发阶段直接加载源码，在上线时加载编译压缩后的版本：
      </p>
      <code-h lang="js">
        // 全量加载
        import Vue from 'vue'
        import AdminUi from 'admin-ui/src' // 开发阶段
        // import AdminUi from 'admin-ui/dist' // 上线阶段
        Vue.use(AdminUi)
      </code-h>
      <p class="paragraph">
        如果不希望手动更换引用位置，可以使用webpack的alias配置，通过动态判断当前环境来决定加载哪个版本：
      </p>
      <code-h lang="js">
        module.exports = {
          // 省略其它配置
          resolve: {
            alias: {
              'vue$': 'vue/dist/vue.esm.js',
              '@': resolve('src'),
              'admin-ui': process.env.NODE_ENV === 'production' ? 'admin-ui/dist' : 'admin-ui/src'
            }
          }
        }
      </code-h>
      <p class="paragraph">
        如果是按需加载，则请直接从源码的出口加载，并让你的打包工具对其进行打包
      </p>
      <code-h lang="js">
        // 按需加载
        import { AuIcon } from 'admin-ui/src' // 所有的组件名称前都有Au前缀
        export default {
          components: { AuIcon }
        }
      </code-h>
      <code-h lang="js">
        // 以webpack为例，按需加载时需要配置对admin-ui进行打包
        module.exports = {
          module: {
            rules: [
              // 省略其它配置
              {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test'), resolve('node_modules/admin-ui')] // 主要是babel
              }
            ]
          }
        }
      </code-h>
    </au-panel>
  </div>
</template>
<script>
  export default {
    name: 'installtion-examples'
  }
</script>

