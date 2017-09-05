import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'global-style',
      component: (resolve) => require(['../examples/global-style.vue'], resolve)
    }
  ]
})
