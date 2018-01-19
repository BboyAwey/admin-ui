<template>
  <div class="page">
    <au-panel class="section" title="安装">
      <p class="paragraph">
        推荐的安装方式是使用yarn（npm或cnpm也可以，但命令略有区别）进行安装：
      </p>
      <code-h lang="ssh">
        yarn add git+ssh://git@gogs.in.dataengine.com:Admin-UI/admin-ui-2-publish.git
      </code-h>
      <cite class="cite au-theme-before-background-color--base-8 au-theme-font-color--base-5">
        由于使用的是公司的私有代码库，请确保你的机器有权访问这个git地址。
      </cite>
    </au-panel>
    <au-panel class="section" title="全量加载">
      <p class="paragraph">
        安装完成后，可以选择全量加载组件或者按需加载。
      </p>
      <code-h lang="js">
        // 项目入口文件
        // 确保你已经引入了Vue
        // 全量加载
        import AdminUi from 'admin-ui/dist/index.js'
        import 'admin-ui/dist/style.css' // 样式需要单独引入
      </code-h>
      <!-- <p class="paragraph">
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
        import 'admin-ui/style.css'
        Vue.use(AdminUi)
      </code-h> -->
    </au-panel>
    <au-panel class="section" title="按需加载">
      <p class="paragraph">
        如果是按需加载，则需要从<span class="code au-theme-radius au-theme-background-color--warning-5">admin-ui/dist/lib</span>目录加载需要的组件。
      </p>
      <code-h lang="js">
        // 组件依赖样式、字体和主题，所以你还需要额外在你的入口文件中先引入它们：
        import 'admin-ui/dist/style.css'
        import theme from 'admin-ui/dist/theme'
        theme()


        // 然后引入并注册组件
        import Button from 'admin-ui/dist/lib/button'
        import Icon from 'admin-ui/dist/lib/icon'

        Vue.component(Button.name, Button)
        Vue.component(Icon.name, Icon)
      </code-h>
      <p class="paragraph">
        我们没有将组件的样式单独分开有两个原因，首先组件们的样式集合起来体积并不大，压缩打包后控制在60KB以内（这其中绝大部分都是font-awesome的样式代码，组件的所有样式不超过5kb）；其次由于使用了font-awesome，如果每个组件单独引入自己的样式，依赖了font-awesome的组件们就会出现重复的样式。
      </p>
    </au-panel>
  </div>
</template>
<script>
  export default {
    name: 'installtion-examples'
  }
</script>

