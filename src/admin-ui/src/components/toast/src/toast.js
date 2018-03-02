import Vue from 'vue'
import ToastConfig from './toast.vue'
// import { namespace } from '../../../helpers/utils'

// use a pull to saving created toast instance to avoid create repeatly
let pool = []
let getToastInstance = function () {
  if (pool.length) {
    return pool.shift()
  } else {
    let ins = new (Vue.extend(ToastConfig))({el: document.createElement('div')})
    ins._new = true
    return ins
  }
}

// the Toast function for public
let Toast = function (config = {}) {
  let {
    message,
    icon,
    mood,
    customClass,
    closeable,
    duration = 3000, // if 0 will not close automaticly
    center
  } = config

  let instance = getToastInstance()
  instance.message = message
  instance.icon = icon
  instance.mood = mood
  instance.customClass = customClass
  instance.closeable = closeable
  instance.center = center

  instance.$mount()
  if (instance._new) {
    instance.$on('hide', (ins) => {
      pool.push(ins)
    })
    instance._new = false
  }
  document.body.appendChild(instance.$el)
  instance.visible = true

  if (duration !== 0) {
    let clock = setTimeout(function () {
      instance.visible = false
      clearTimeout(clock)
      clock = null
    }, duration)
  }
}

export default Toast
