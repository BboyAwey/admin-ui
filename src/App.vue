<style lang="scss" scoped>
  #app {
    height: 100%;
    .banner {
      font-size: 30px;
      padding: 20px;
    }
    .menu {
      width: 200px;
    }
  }
</style>

<template>
  <div id="app">
    <au-frame>
      <div slot="header">
        <h3 class="banner">Admin UI 2</h3>
      </div>
      <div slot="sidebar">
        <au-menu :items="menu" @select="go" class="menu" :collapsable="true" :collapse="false"></au-menu>
      </div>
      <div slot="content">
        <router-view></router-view>
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
        menu
      }
    },
    methods: {
      go (item) {
        if (item.url) this.$router.push(item.url)
      }
    }
  }
</script>
