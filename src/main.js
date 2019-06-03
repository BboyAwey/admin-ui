// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import codeH from './examples/helper/code-h.vue'
import router from './router'
import adminUi from './admin-ui/src'
import './style/_common.scss'

// adminUi.theme('dark')
Vue.use(adminUi)

Vue.component('code-h', codeH)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
}).$mount('#app')
