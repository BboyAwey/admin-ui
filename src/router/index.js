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
      path: '/installation',
      name: 'installation',
      component: (resolve) => require(['../examples/installation.vue'], resolve)
    },
    {
      path: '/theme',
      name: 'theme',
      component: (resolve) => require(['../examples/theme.vue'], resolve)
    },
    {
      path: '/icon',
      name: 'icon',
      component: (resolve) => require(['../examples/icon.vue'], resolve)
    },
    {
      path: '/button',
      name: 'button',
      component: (resolve) => require(['../examples/button.vue'], resolve)
    },
    {
      path: '/collapse',
      name: 'collapse',
      component: (resolve) => require(['../examples/collapse.vue'], resolve)
    },
    {
      path: '/scroller',
      name: 'scroller',
      component: (resolve) => require(['../examples/scroller.vue'], resolve)
    },
    {
      path: '/menu',
      name: 'menu',
      component: (resolve) => require(['../examples/menu.vue'], resolve)
    },
    {
      path: '/frame',
      name: 'frame',
      component: (resolve) => require(['../examples/frame.vue'], resolve)
    },
    {
      path: '/popover',
      name: 'popover',
      component: (resolve) => require(['../examples/popover.vue'], resolve)
    },
    {
      path: '/grid',
      name: 'grid',
      component: (resolve) => require(['../examples/grid.vue'], resolve)
    },
    {
      path: '/table',
      name: 'table',
      component: (resolve) => require(['../examples/table.vue'], resolve)
    },
    {
      path: '/panel',
      name: 'panel',
      component: (resolve) => require(['../examples/panel.vue'], resolve)
    },
    {
      path: '/previewer',
      name: 'previewer',
      component: (resolve) => require(['../examples/previewer.vue'], resolve)
    },
    {
      path: '/upload',
      name: 'upload',
      component: (resolve) => require(['../examples/upload.vue'], resolve)
    },
    {
      path: '/input',
      name: 'input',
      component: (resolve) => require(['../examples/input.vue'], resolve)
    },
    {
      path: '/checkbox',
      name: 'checkbox',
      component: (resolve) => require(['../examples/checkbox.vue'], resolve)
    },
    {
      path: '/switch',
      name: 'switch',
      component: (resolve) => require(['../examples/switch.vue'], resolve)
    },
    {
      path: '/radio',
      name: 'radio',
      component: (resolve) => require(['../examples/radio.vue'], resolve)
    },
    {
      path: '/select',
      name: 'select',
      component: (resolve) => require(['../examples/select.vue'], resolve)
    },
    {
      path: '/cascading',
      name: 'cascading',
      component: (resolve) => require(['../examples/cascading.vue'], resolve)
    },
    {
      path: '/datepicker',
      name: 'datepicker',
      component: (resolve) => require(['../examples/datepicker.vue'], resolve)
    },
    {
      path: '/timepicker',
      name: 'timepicker',
      component: (resolve) => require(['../examples/timepicker.vue'], resolve)
    },
    {
      path: '/toast',
      name: 'toast',
      component: (resolve) => require(['../examples/toast.vue'], resolve)
    },
    {
      path: '/modal',
      name: 'modal',
      component: (resolve) => require(['../examples/modal.vue'], resolve)
    },
    {
      path: '/message-box',
      name: 'message-box',
      component: (resolve) => require(['../examples/message-box.vue'], resolve)
    },
    {
      path: '/paginator',
      name: 'paginator',
      component: (resolve) => require(['../examples/paginator.vue'], resolve)
    },
    {
      path: '/tabs',
      name: 'tabs',
      component: (resolve) => require(['../examples/tabs.vue'], resolve)
    }
  ]
})
