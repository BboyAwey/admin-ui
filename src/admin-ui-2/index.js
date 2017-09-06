import themeGenerator from './theme'
import { getGlobal } from './helpers/utils'
const glo = getGlobal()

// import all comps
import auButton from './components/au-button'

// add all comps into an array
const components = [
  auButton
]

// export comps one by one
export {
  auButton
}

// export all comps as an object
const adminUi = {
  auButton
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

adminUi.theme = function (theme) {
  if (glo.document && glo.document.querySelector) {
    let styleTag = glo.document.querySelector('style#admin-ui-theme') || glo.document.createElement('style')

    styleTag.id = 'admin-ui-theme'
    styleTag.innerHTML = themeGenerator(theme)
    glo.document.querySelector('head').appendChild(styleTag)
  }
}
// gen default theme
adminUi.theme()
export default adminUi
