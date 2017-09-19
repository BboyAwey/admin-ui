import Vue from 'vue'
import './style/reset.css'
import ThemeGenerator from './theme'

import Directives from './directives'

// import all comps
import Button from './components/button'
import Menu from './components/menu'
import Icon from './components/icon'
import Collapse from './components/collapse'
import Frame from './components/frame'
import Scroller from './components/scroller'
import Popover from './components/popover'
import Grid from './components/grid'
import GridContainer from './components/grid-container'

// add all comps into an array
const components = [
  Button,
  Menu,
  Icon,
  Collapse,
  Frame,
  Scroller,
  Popover,
  Grid,
  GridContainer
]

// export comps one by one
export {
  Button,
  Menu,
  Icon,
  Collapse,
  Frame,
  Scroller,
  Popover,
  Grid,
  GridContainer
}

// export all comps as an object
const adminUi = {
  Button,
  Menu,
  Icon,
  Collapse,
  Frame,
  Scroller,
  Popover,
  Grid,
  GridContainer
}

adminUi.install = function (Vue, options = {}) {
  // install all the comps
  components.map(component => {
    Vue.component(component.name, component)
  })
  // Vue.prototype.$messageBox = AdminMessageBox
  // Vue.prototype.$alert = AdminMessageBox.alert
  // Vue.prototype.$confirm = AdminMessageBox.confirm
  // Vue.prototype.$prompt = AdminMessageBox.prompt
  // Vue.prototype.$toast = AdminToast
}

// add direvtives installing function
adminUi.direvtive = function (Vue) {
  for (let name in Directives) {
    Vue.directive(name, Directives[name])
  }
}

// add theme generator function
adminUi.theme = function (theme) {
  let styleTag = window.document.querySelector('style#admin-ui-theme') || window.document.createElement('style')

  styleTag.id = 'admin-ui-theme'
  styleTag.innerHTML = ThemeGenerator(theme)
  window.document.querySelector('head').appendChild(styleTag)
}
// gen default theme
adminUi.theme()
// gen directive
adminUi.direvtive(Vue)
export default adminUi
