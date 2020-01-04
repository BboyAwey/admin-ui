export class Interval {
  constructor (callback, time = 0, context) {
    this.time = time
    this.callback = callback
    this.context = context
    this.lastTimestamp = null
    this.request = null
    this.start()
  }

  start () {
    this.request = window.requestAnimationFrame(this.step.bind(this))
  }

  step () {
    const now = new Date().getTime()
    if (this.time <= now - this.lastTimestamp) {
      this.lastTimestamp = now
      this.callback.call(this.context)
    }
    this.request = window.requestAnimationFrame(this.step.bind(this))
  }

  stop () {
    window.cancelAnimationFrame(this.request)
  }
}

export const deepClone = (obj) => {
  if (!(obj instanceof Array || obj instanceof Object)) {
    console.warn('Admin UI@deep-clone@ can only deepCopy array or plain object')
    return {}
  } else return JSON.parse(JSON.stringify(obj))
}

export const getDataType = (o) => {
  // Author: yuhaijun
  // email: yuhaijun@rongcapital.cn
  // get data type
  const regStr = /[^, ]+/g
  var type = {}
  'Boolean Number String Function Array Date RegExp Object Error'.replace(regStr, (name) => {
    type['[object ' + name + ']'] = name.toLowerCase()
  })
  return type[Object.prototype.toString.call(o)]
}

if (!window.adminUiNameSpace) window.adminUiNameSpace = {}
export const namespace = {
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

if (!namespace.get('heartbeatStack')) namespace.set('heartbeatStack', {})
let stack = namespace.get('heartbeatStack')

if (!namespace.get('heartbeat')) {
  // namespace.set('heartbeat', window.setInterval(function () {
  //   for (let f of Object.values(stack)) f()
  // }, 300))
  namespace.set('heartbeat', new Interval(function () {
    for (let f of Object.values(stack)) f()
  }))
}

export const heartbeat = {
  add (f, id) { stack[id] = f },
  remove (id) { delete stack[id] }
}

export const isEmptyString = (str) => {
  return str === '' || /^\s+$/g.test(str)
}
