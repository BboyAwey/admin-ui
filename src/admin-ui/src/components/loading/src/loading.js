import Vue from 'vue'
import template from './loading.vue'

export default (config) => {
  let instance = new (Vue.extend(template))()
  let {
    target = document.element.body,
    text
  } = config

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
    borderRightWidth
  } = getComputedStyle(target)
  if (position === 'static') {
    target.style.position = 'relative'
  }
  let size = Math.min(
    parseInt(width) - parseInt(borderLeftWidth) - parseInt(borderRightWidth),
    parseInt(height) - parseInt(borderTopWidth) - parseInt(borderBottomWidth)
  )
  size = size > 50 ? 50 : size

  instance.text = text
  instance.size = size
  instance.$mount(document.createElement('div'))

  target.appendChild(instance.$el)
  instance.setColor()
  instance.setTop(parseInt(height) - parseInt(borderTopWidth) - parseInt(borderBottomWidth))

  return instance
}
