<template>
  <div id="app">
    <au-menu :items="menu"></au-menu>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      menu: [
        {
          'text': '用户管理',
          'url': '/ad-toast-example',
          'icon': 'home',
          'collapse': false,
          'active': false
        },
        {
          'text': '消息管理',
          'url': '/ad-menu-example',
          'icon': 'home',
          'collapse': false,
          'active': false
        },
        {
          'text': '系统管理',
          'url': 'abc',
          'icon': 'home',
          'collapse': false,
          'active': true,
          'children': [
            {
              'text': '项目管理',
              'url': 'abc',
              'icon': 'home',
              'collapse': false,
              'active': false
            },
            {
              'text': '人员管理',
              'url': 'abc',
              'icon': 'home',
              'collapse': false,
              'active': false,
              'children': [
                {
                  'text': '权限管理',
                  'url': 'abc',
                  'collapse': false,
                  'active': false,
                  'children': []
                },
                {
                  'text': '用户管理',
                  'url': 'abc',
                  'collapse': false,
                  'active': false,
                  'children': []
                }
              ]
            }
          ]
        }
      ]
    }
  }
}
</script>
