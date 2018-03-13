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
        <au-menu
          collapse-handlebar-position="bottom"
          :items="menu"
          @select="go"
          class="menu"
          :collapsable="true"
          :collapse="false"/>
      </div>
      <div slot="content">
        <au-scroller style="height: 100%;" ref="scroller" :scroll-top="scrollTop" @scroll="handleScroll" hide-popovers>
          <router-view></router-view>
        </au-scroller>
      </div>
    </au-frame>
  </div>
</template>

<script>
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
        this.$router.push({
          path: item.url
        })
        this.scrollTop = 0
      }
    },
    handleScroll (v) {
      this.scrollTop = v
    }
  }
}
</script>
