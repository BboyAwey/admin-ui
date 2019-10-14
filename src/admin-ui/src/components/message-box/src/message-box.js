import Vue from 'vue'
import AuModalTemplate from 'components/modal'
import { namespace } from 'helpers/utils'

import AuAlertTemplate from './alert'
import AuConfirmTemplate from './confirm'
import AuPromptTemplate from './prompt'

// make sure only single vue instance to save memos
function getInstance (type) {
  switch (type) {
    case 'modal':
      let res = null
      if (namespace.get('adModalIntance')) {
        res = namespace.get('adModalIntance')
      } else {
        res = new (Vue.extend(AuModalTemplate))({
          el: document.createElement('div'),
          props: {
            autoScroll: false
          }
        })
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
// when modal close itself we shoud sync the visible prop
instances.modal.$on('hide', () => {
  if (instances.modal.$el.parentNode) {
    instances.modal.$el.parentNode.removeChild(instances.modal.$el)
    instances.modal.visible = false
    if (instances.modal._callback instanceof Function) {
      instances.modal._callback()
    }
    instances.modal._callback = null
  }
})

// refresh el innnerHTML
function refreshContent (el, contentInstance) {
  el.innerHTML = ''
  contentInstance.$mount()
  el.appendChild(contentInstance.$el)
}

function getCancelButton (instance, config) {
  return {
    text: config.cancelText || '取消',
    size: config.buttonSize,
    plain: config.buttonPlain,
    handler () {
      instance._callback = config.cancel
      instance.visible = false
    }
  }
}

function getConfirmButton (instance, config) {
  return {
    text: config.confirmText || '确定',
    type: 'primary',
    size: config.buttonSize,
    plain: config.buttonPlain,
    handler () {
      instance._callback = config.confirm
      instance.visible = false
    }
  }
}

function MessageBox (config) {
  let { type = 'alert', title, message, icon, messageType, validators, reset, placeholder } = config
  if (!type || ['alert', 'confirm', 'prompt'].indexOf(type) === -1) {
    console.warn('Admin UI@massage-box@ "type" is required and must be "alert","confirm" or "prompt"')
  }

  // deal with the modal config
  instances.modal._callback = config.cancel // default is cancel callback
  if (type === 'alert') {
    instances.modal.buttons = [getConfirmButton(instances.modal, config)]
    instances.modal.onEnter = instances.modal.buttons[0].text
  }
  if (type === 'confirm') {
    instances.modal.buttons = [
      getCancelButton(instances.modal, config),
      getConfirmButton(instances.modal, config)
    ]
    instances.modal.onEnter = instances.modal.buttons[1].text
  }
  if (type === 'prompt') {
    instances.modal._config = config
    instances.modal.buttons = [
      getCancelButton(instances.modal, config),
      Object.assign({}, getConfirmButton(instances.modal, config), {
        handler (loading) {
          let config = instances.modal._config
          loading.start()
          instances[config.type].validate().then(res => {
            loading.stop()
            if (res) {
              instances.modal._callback = () => config.confirm(instances[config.type].value)
              instances.modal.visible = false
            }
          })
        }
      })
    ]
    instances.modal.onEnter = instances.modal.buttons[1].text
  }

  // get a content instance
  let contentInstance = instances[type]
  if (reset || reset === '') {
    contentInstance.$refs.core.clear()
    if (reset !== true && reset !== '') {
      contentInstance.value = reset
      contentInstance.$refs.core.localValue = reset
    }
  }
  // set content instance props
  Object.assign(contentInstance, { message, icon, messageType, validators, placeholder })
  // put the content into modal and show them on document
  refreshContent(instances.modal.$refs.content, contentInstance)
  instances.modal.title = title
  instances.modal.visible = true
  instances.modal.$mount()
  document.body.appendChild(instances.modal.$el)
  // auto focus
  if (type === 'prompt' && contentInstance.$refs.core && contentInstance.$refs.core.$refs.core) {
    Vue.nextTick(() => contentInstance.$refs.core.$refs.core.focus())
  }
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
