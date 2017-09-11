import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/button',
      name: 'button',
      component: (resolve) => require(['../examples/au-button-examples.vue'], resolve)
    },
    {
      path: '/scroller',
      name: 'scroller',
      component: (resolve) => require(['../examples/au-scroller-examples.vue'], resolve)
    }
  ]
})
