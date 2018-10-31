import namespace from './namespace'

if (!namespace.get('heartbeatStack')) namespace.set('heartbeatStack', {})
let stack = namespace.get('heartbeatStack')

if (!namespace.get('heartbeat')) {
  namespace.set('heartbeat', window.setInterval(function () {
    for (let f of Object.values(stack)) f()
  }, 100))
}

export default {
  add (f, id) { stack[id] = f },
  remove (id) { delete stack[id] }
}
