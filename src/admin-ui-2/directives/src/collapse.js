import { getElementSize, addClass } from '../../helpers/dom'

function getContentSize (el) {
  let computedStyle = getComputedStyle(el)
  let container = document.createElement(el.name)
  container.innerHTML = el.innerHTML
  let contentSize = getElementSize(container, true)
  return {
    width: contentSize.width + parseInt(computedStyle.paddingLeft) + parseInt(computedStyle.paddingRight),
    height: contentSize.height + parseInt(computedStyle.paddingTop) + parseInt(computedStyle.paddingBottom)
  }
}

export default {
  bind (el) {
    if (!document.querySelector('style#au-directive-collapse')) {
      let style = document.createElement('style')
      style.id = 'au-directive-collapse'
      style.innerHTML = `.au-directive-collapse{transition:height .2s ease-in-out;overflow:hidden;}`
      document.querySelector('head').appendChild(style)
    }
    addClass(el, 'au-directive-collapse')
  },
  update (el, binding) {
    function setHeightAuto () {
      el.style.height = 'auto'
      el.removeEventListener('transitionend', setHeightAuto)
    }
    console.log(binding.value)
    if (binding.value) {
      el.removeEventListener('transitionend', setHeightAuto)
      el.style.height = getContentSize(el).height + 'px'
      let clock = setTimeout(function () {
        el.style.height = (binding.arg || 0) + 'px'
        clearTimeout(clock)
        clock = null
      })
    } else {
      el.addEventListener('transitionend', setHeightAuto)
      el.style.height = getContentSize(el).height + 'px'
    }
  }
}
