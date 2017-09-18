<style lang="scss" scoped>
  #app {
    height: 100%;
    .admin-ui-banner {
      font-size: 30px;
      padding: 20px;
    }
  }
</style>

<template>
  <div id="app">
    <au-frame>
      <div slot="header">
        <h3 class="admin-ui-banner">Admin-UI</h3>
      </div>
      <div slot="sidebar">
        <au-menu :items="menu" @select="go" class="menu" :collapsable="true" :collapse="true"></au-menu>
      </div>
      <div slot="content">
        <router-view></router-view>
      </div>
    </au-frame>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      menu: [
        {
          'text': '介绍',
          'url': '/intro',
          'icon': 'info-circle'
        },
        {
          'text': '安装',
          'url': '/installation',
          'icon': 'cog'
        },
        {
          'text': '主题',
          'url': '/theme',
          'icon': 'th-large'
        },
        {
          'text': '组件',
          'icon': 'cube',
          'collapse': false,
          'children': [
            {
              'text': '图标',
              'url': '/icon'
            },
            {
              'text': '按钮',
              'url': '/button'
            },
            {
              'text': '手风琴',
              'url': '/collapse'
            },
            {
              'text': '气泡',
              'url': '/popover'
            },
            {
              'text': '菜单',
              'url': '/menu'
            },
            {
              'text': '滚动条',
              'url': '/scroller'
            },
            {
              'text': '框架',
              'url': '/frame'
            }
          ]
        }
      ]
    }
  },
  methods: {
    go (item) {
      if (item.url) this.$router.push(item.url)
    }
  }
}
</script>
