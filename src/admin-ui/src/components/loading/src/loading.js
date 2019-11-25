import Vue from 'vue'
import template from './loading.vue'
import { addClass } from 'helpers/dom'

export default (config = {}) => {
  let instance = new (Vue.extend(template))()
  let {
    target = document.body,
    message,
    color = 'primary',
    tag,
    size,
    mask = true,
    delay = 500
  } = config
  // function colorValidator (v) {
  //   return ['primary', 'danger', 'info', 'success', 'warning'].indexOf(v) !== -1 ||
  //     console.warn('Admin UI@au-loading@color must be one of the type below: primary, danger, info, success, warning')
  // }
  let timer = setTimeout(() => {
    let {
      position,
      width,
      height,
      // paddingTop,
      // paddingBottom,
      // paddingLeft,
      // paddingRight,
      borderTopWidth,
      borderBottomWidth,
      borderLeftWidth,
      borderRightWidth,
      zIndex
    } = getComputedStyle(target)
    if (position === 'static') addClass(target, 'au-loading-position-fixed')

    if (!zIndex || zIndex === 'auto') addClass(target, 'au-loading-z-index-fixed')

    if (!size) {
      size = Math.min(
        parseInt(width) - parseInt(borderLeftWidth) - parseInt(borderRightWidth),
        parseInt(height) - parseInt(borderTopWidth) - parseInt(borderBottomWidth)
      )
      size = size > 50 ? 50 : size
    }

    instance.message = message
    instance.size = parseInt(size)
    instance.mask = mask
    // instance.color = colorValidator(color) ? color : 'primary'
    instance.color = color

    instance.$mount(document.createElement('div'))

    let el = null
    if (tag) {
      el = document.createElement(tag)
      el.style.position = 'absolute'
      el.style.top = '0px'
      el.style.bottom = '0px'
      el.style.left = '0px'
      el.style.right = '0px'
      el.appendChild(instance.$el)
      // instance need to know which element should be removed before close
      instance.el = el
    } else el = instance.$el
    target.appendChild(el)
    // instance.setColor()
    clearTimeout(timer)
    timer = null
  }, delay)

  return {
    close () {
      clearTimeout(timer)
      timer = null
      instance.$destroy()
      instance = null
    }
  }
}
