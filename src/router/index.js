import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: {name: 'intro'}
    },
    {
      path: '/intro',
      name: 'intro',
      component: (resolve) => require(['../examples/intro.vue'], resolve)
    },
    {
      path: '/button',
      name: 'button',
      component: (resolve) => require(['../examples/button-examples.vue'], resolve)
    },
    {
      path: '/scroller',
      name: 'scroller',
      component: (resolve) => require(['../examples/scroller-examples.vue'], resolve)
    },
    {
      path: '/popover',
      name: 'popover',
      component: (resolve) => require(['../examples/popover-examples.vue'], resolve)
    },
    {
      path: '/grid',
      name: 'grid',
      component: (resolve) => require(['../examples/grid-examples.vue'], resolve)
    },
    {
      path: '/table',
      name: 'table',
      component: (resolve) => require(['../examples/table-examples.vue'], resolve)
    }
  ]
})
