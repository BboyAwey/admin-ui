if (!window.adminUiNameSpace) window.adminUiNameSpace = {}
export default {
  set: function (key, value) {
    window.adminUiNameSpace[key] = value
    return window.adminUiNameSpace[key]
  },
  get: function (key) {
    return window.adminUiNameSpace[key]
  },
  remove: function (key) {
    return delete window.adminUiNameSpace[key]
  }
}
