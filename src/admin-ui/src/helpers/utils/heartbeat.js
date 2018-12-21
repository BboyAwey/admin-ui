import namespace from './namespace'

if (!namespace.get('heartbeatStack')) namespace.set('heartbeatStack', {})
let stack = namespace.get('heartbeatStack')

if (!namespace.get('heartbeat')) {
  // namespace.set('heartbeat', window.setInterval(function () {
  //   for (let f of Object.values(stack)) f()
  // }, 100))
  namespace.set('heartbeat', window.requestAnimationFrame(function heatbeat () {
    for (let f of Object.values(stack)) f()
    namespace.set('heartbeat', window.requestAnimationFrame(heatbeat))
  }))
}

export default {
  add (f, id) { stack[id] = f },
  remove (id) { delete stack[id] }
}
