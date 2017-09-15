import Vue from 'vue'
import './style/reset.css'
import ThemeGenerator from './theme'

import Directives from './directives'

// import all comps
import AuButton from './components/au-button'
import AuMenu from './components/au-menu'
import AuIcon from './components/au-icon'
import AuCollapse from './components/au-collapse'
import AuFrame from './components/au-frame'
import AuScroller from './components/au-scroller'
import AuPopover from './components/au-popover'

// add all comps into an array
const components = [
  AuButton,
  AuMenu,
  AuIcon,
  AuCollapse,
  AuFrame,
  AuScroller,
  AuPopover
]

// export comps one by one
export {
  AuButton,
  AuMenu,
  AuIcon,
  AuCollapse,
  AuFrame,
  AuScroller,
  AuPopover
}

// export all comps as an object
const adminUi = {
  AuButton,
  AuMenu,
  AuIcon,
  AuCollapse,
  AuFrame,
  AuScroller,
  AuPopover
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
