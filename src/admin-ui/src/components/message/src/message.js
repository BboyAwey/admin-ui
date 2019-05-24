import Vue from 'vue'
import MessageConfig from './message.vue'

// use a pull to saving created message instance to avoid create repeatly
let pool = []
let getMessageInstance = function () {
  if (pool.length) {
    return pool.shift()
  } else {
    let ins = new (Vue.extend(MessageConfig))({ el: document.createElement('div') })
    return ins
  }
}

// the Message function for public
let Message = function (config = {}) {
  let {
    message,
    icon,
    type,
    customClass,
    closeable,
    duration = 3000 // if 0 will not close automaticly
    // center
  } = config

  let instance = getMessageInstance()
  instance.$off()
  instance.message = message
  instance.icon = icon
  instance.type = type
  instance.customClass = customClass
  instance.closeable = closeable
  // instance.center = center

  instance.$mount()
  instance.$on('close', (ins) => {
    pool.push(ins)
  })
  document.body.appendChild(instance.$el)
  instance.visible = true

  if (duration !== 0) {
    let clock = setTimeout(function () {
      instance.visible = false
      clearTimeout(clock)
      clock = null
    }, duration)
  }
  return instance
}

export default Message
