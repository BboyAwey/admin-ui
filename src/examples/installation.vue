<template>
  <div class="page">
    <au-panel class="section" title="安装">
      <p class="paragraph">
        推荐的安装方式是使用npm或cnpm进行安装：
      </p>
      <code-h lang="shell">
        cnpm install git+ssh://git@gogs.in.dataengine.com:Admin-UI/admin-ui-2-publish.git --save
      </code-h>
      <cite class="cite au-theme-before-background-color--base-8 au-theme-font-color--base-5">
        由于使用的是公司的私有代码库，请确保你的机器有权访问这个git地址。
      </cite>
    </au-panel>
    <au-panel class="section" title="全量加载">
      <p class="paragraph">
        安装完成后，可以选择按需加载组件或者全量加载。
      </p>
      <p class="paragraph">
        如果是全量加载，我们推荐在开发阶段直接加载未压缩版本，在上线时加载压缩后的版本：
      </p>
      <code-h lang="js">
        // 项目入口文件
        import Vue from 'vue'
        // 全量加载
        import AdminUi from 'admin-ui/dist' // 开发阶段
        import from 'admin-ui/dist/style.css'
        // import AdminUi from 'admin-ui/min' // 上线阶段
        // import from 'admin-ui/min/style.css'
        Vue.use(AdminUi)
      </code-h>
      <p class="paragraph">
        如果不希望手动更换引用位置，可以使用webpack的alias配置，通过动态判断当前环境来决定加载哪个版本：
      </p>
      <code-h lang="js">
        // webkpack 配置文件
        module.exports = {
          // 省略其它配置
          resolve: {
            alias: {
              'vue$': 'vue/dist/vue.esm.js',
              '@': resolve('src'),
              'admin-ui': process.env.NODE_ENV === 'production' ? 'admin-ui/min' : 'admin-ui/dist'
            }
          }
        }
      </code-h>
      <code-h lang="js">
        // 项目入口文件
        import Vue from 'vue'
        import AdminUi from 'admin-ui'
        import from 'admin-ui/style.css'
        Vue.use(AdminUi)
      </code-h>
    </au-panel>
    <au-panel class="section" title="按需加载">
      <p class="paragraph">
        如果是按需加载，则直接加载需要的组件即可。（压缩与未压缩版本可按照上文方式进行选择和配置）
      </p>
      <code-h lang="js">
        // 按需加载
        // 所有的组件名称前都有Au前缀，这种写法默认你配置了webpack alias
        import { AuIcon } from 'admin-ui'
        export default {
          components: { AuIcon }
        }
      </code-h>
    </au-panel>
    <au-panel class="section" title="加载源码">
      <p class="paragraph">
        无论是全量加载还是按需加载，都可以加载未编译压缩的Admin UI的源码，如果你有更优化的打包方案，这是推荐的做法。
      </p>
      <p class="paragraph">
        当加载未编译压缩的Admin UI的源码时，你需要确保你的打包工具能够正确处理来自<span class="code au-theme-radius au-theme-background-color--warning-5">node_modules</span>的Admin UI的代码。
      </p>
      <code-h lang="js">
        // 以webpack为例，加载源码时需要让你的打包工具对admin-ui进行打包
        module.exports = {
          module: {
            rules: [
              // 省略其它配置
              {
                test: /\.js$/,
                loader: 'babel-loader',
                // 指定对Admin UI进行处理
                include: [resolve('src'), resolve('test'), resolve('node_modules/admin-ui')]
              }
            ]
          }
        }
      </code-h>
      <code-h lang="js">
        // 项目入口文件
        // 全量加载源码
        import Vue from 'vue'
        import AdminUi from 'admin-ui/src'
        // 加载源码时不再需要加载样式
        Vue.use(AdminUi)
      </code-h>
      <code-h lang="js">
        // 按需加载源码
        import Vue from 'vue'
        import { auButton} from 'admin-ui/src'
        Vue.use(AdminUi)
      </code-h>
      <cite class="cite au-theme-before-background-color--base-8 au-theme-font-color--base-5">
        注意，我们不建议从components文件夹直接加载组件源代码，原因是我们在Admin UI的出口文件中处理了主题系统。如果你绕过出口文件直接加载源码，则Admin UI的主题系统会失效。
      </cite>
    </au-panel>
  </div>
</template>
<script>
  export default {
    name: 'installtion-examples'
  }
</script>

