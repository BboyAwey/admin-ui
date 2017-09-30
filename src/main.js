// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import codeH from './examples/helper/codeHighlighter.vue'
import router from './router'
import adminUi from './admin-ui'
import './style/_common.scss'

// adminUi2.theme()
Vue.use(adminUi)

Vue.component('code-h', codeH)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
