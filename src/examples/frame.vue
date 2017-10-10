<style lang="scss" scoped>

</style>
<template>
  <div class="page">
    <au-panel class="section" title="组件描述">
      <p class="paragraph">
        一个带有头部、侧边栏、内容区和页尾的，用于快速布局的页面框架组件
      </p>
      <cite class="cite au-theme-before-background-color--base-8 au-theme-font-color--base-5">
        示例请参考本页面
      </cite>
    </au-panel>
    <au-panel class="section" title="Props">
      <au-icon type="minus"></au-icon>
    </au-panel>
    <au-panel class="section" title="Slots">
      <au-table>
        <thead>
          <tr>
            <th>名称</th>
            <th>说明</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>header</td>
            <td>
              页头
            </td>
          </tr>
          <tr>
            <td>sidebar</td>
            <td>
              边栏
            </td>
          </tr>
          <tr>
            <td>content</td>
            <td>
              内容区
            </td>
          </tr>
          <tr>
            <td>footer</td>
            <td>
              页尾
            </td>
          </tr>
        </tbody>
      </au-table>
      <!-- <au-icon type="minus"></au-icon> -->
      <cite class="cite au-theme-before-background-color--danger-5 au-theme-font-color--base-5">
        注意，使用frame组件时，需要保证其所有祖先元素（包括body和html）的<span class="code au-theme-radius au-theme-background-color--warning-5">height</span>都为<span class="code au-theme-radius au-theme-background-color--warning-5">100%</span>
      </cite>
    </au-panel>
    <au-panel class="section" title="Events">
      <au-icon type="minus"></au-icon>
    </au-panel>
    <au-panel class="section" title="Methods">
      <au-icon type="minus"></au-icon>
    </au-panel>
    <au-panel class="section" title="使用示例">
      <h4 class="title-1">基础用例</h4>
      <code-h lang="html" content='
        <style lang="scss" scoped>
          #app {
            height: 100%;
            .banner {
              font-size: 30px;
              padding: 10px 20px;
            }
            .menu {
              width: 210px;
            }
          }
        </style>
        <template>
          <div id="app" class="au-theme-background-color--base-10">
            <au-frame>
              <div slot="header">
                <!-- <h3 class="banner">Admin UI 2</h3> -->
                <h3 class="banner"><img src="./assets/logo.png" /></h3>
              </div>
              <div slot="sidebar">
                <au-menu :items="menu" @select="go" class="menu" :collapsable="true" :collapse="false"></au-menu>
              </div>
              <div slot="content">
                <au-scroller style="height: 100%;" ref="scroller" :scroll-top="scrollTop" @scroll="handleScroll">
                  <router-view></router-view>
                </au-scroller>
              </div>
            </au-frame>
          </div>
        </template>
      '></code-h>
      <code-h lang="js">
        import menu from './router/menu'

        export default {
          name: 'app',
          data () {
            return {
              menu,
              scrollTop: 0
            }
          },
          methods: {
            go (item) {
              if (item.url) {
                this.$router.push(item.url)
                this.scrollTop = 0
              }
            },
            handleScroll (v) {
              this.scrollTop = v
            }
          }
        }
      </code-h>
    </au-panel>
  </div>
</template>
<script>
  export default {
    name: 'frame-examples'
  }
</script>

