import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/au-button',
      name: 'au-button',
      component: (resolve) => require(['../examples/au-button-examples.vue'], resolve)
    }
  ]
})
