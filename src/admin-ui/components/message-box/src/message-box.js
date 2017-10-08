import Vue from 'vue'
import AuModalTemplate from '../../modal'
import AuAlertTemplate from './alert'
import AuConfirmTemplate from './confirm'
import AuPromptTemplate from './prompt'
import { namespace } from '../../../helpers/utils'

// make sure only single vue instance to save memos
function getInstance (type) {
  switch (type) {
    case 'modal':
      let res = null
      if (namespace.get('adModalIntance')) {
        res = namespace.get('adModalIntance')
      } else {
        res = new (Vue.extend(AuModalTemplate))({ el: document.createElement('div') })
        res.width = 320
        res.height = 164
        if (res.$refs.decline) res.$refs.decline.parentNode.removeChild(res.$refs.decline)
        namespace.set('adModalIntance', res)
      }
      return res
    case 'alert':
      return namespace.get('adAlertIntance') ||
        namespace.set('adAlertIntance', new (Vue.extend(AuAlertTemplate))({ el: document.createElement('div') }))
    case 'confirm':
      return namespace.get('adConfirmIntance') ||
        namespace.set('adConfirmIntance', new (Vue.extend(AuConfirmTemplate))({ el: document.createElement('div') }))
    case 'prompt':
      return namespace.get('adPromptIntance') ||
        namespace.set('adPromptIntance', new (Vue.extend(AuPromptTemplate))({ el: document.createElement('div') }))
  }
}

// get all instances
let instances = {
  modal: getInstance('modal'),
  alert: getInstance('alert'),
  confirm: getInstance('confirm'),
  prompt: getInstance('prompt')
}
// when modal close itself we shoud sync the display prop
instances.modal.$on('hide', () => {
  if (instances.modal.$el.parentNode) {
    instances.modal.$el.parentNode.removeChild(instances.modal.$el)
    instances.modal.display = false
  }
})

// refresh el innnerHTML
function refreshContent (el, content) {
  el.innerHTML = ''
  el.appendChild(content)
}

function getCancelButton (instance, config, value) {
  return {
    text: '取消',
    size: config.buttonSize,
    plain: config.buttonPlain,
    handler () {
      if (config.cancel) {
        // Vue.nextTick(() => {
        //   config.cancel(value)
        //   instance.display = false
        // })
        config.cancel(value)
        instance.display = false
      } else {
        instance.display = false
      }
    }
  }
}

function getConfirmButton (instance, config, value) {
  return {
    text: '确定',
    type: 'primary',
    size: config.buttonSize,
    plain: config.buttonPlain,
    handler () {
      if (config.confirm) {
        // Vue.nextTick(() => {
        //   config.confirm(value)
        //   instance.display = false
        // })
        config.confirm(value)
        instance.display = false
      } else {
        instance.display = false
      }
    }
  }
}

function MessageBox (config) {
  let { type = 'alert', message, validators, reset, placeholder } = config
  if (!type || ['alert', 'confirm', 'prompt'].indexOf(type) === -1) {
    console.warn('Admin UI@massage-box@ "type" is required and must be "alert","confirm" or "prompt"')
  }

  // deal with the modal config
  instances.modal.config = config
  if (type === 'alert') {
    instances.modal.buttons = [getConfirmButton(instances.modal, config)]
  }
  if (type === 'confirm') {
    instances.modal.buttons = [getCancelButton(instances.modal, config), getConfirmButton(instances.modal, config)]
  }
  if (type === 'prompt') {
    instances.modal.buttons = [getCancelButton(instances.modal, config), Object.assign({}, getConfirmButton(instances.modal, config), {
      handler () {
        let config = instances.modal.config
        instances[config.type].validate().then(res => {
          if (res) {
            if (config.confirm) config.confirm()
            instances.modal.display = false
          }
        })
      }
    })]
  }
  if (type === 'prompt') instances.modal.height = 200
  else instances.modal.height = 144

  // get a content instance
  let contentInstance = instances[type]
  if (reset) contentInstance.$refs.core.reset()
  // set content instance props
  Object.assign(contentInstance, {message, validators, placeholder})
  // put the content into modal and show them on document
  refreshContent(instances.modal.$refs.content, contentInstance.$el)
  instances.modal.display = true
  // auto focus
  if (contentInstance.$refs.core && contentInstance.$refs.core.$refs.core) {
    contentInstance.$refs.core.$refs.core.focus()
  }
  instances.modal.$mount()
  document.body.appendChild(instances.modal.$el)
}
MessageBox.alert = function (config) {
  MessageBox(Object.assign(config, {
    type: 'alert'
  }))
}
MessageBox.confirm = function (config) {
  MessageBox(Object.assign(config, {
    type: 'confirm'
  }))
}
MessageBox.prompt = function (config) {
  MessageBox(Object.assign(config, {
    type: 'prompt'
  }))
}
export default MessageBox
