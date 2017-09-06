import { isEmptyString, getGlobal } from './utils'
let glo = getGlobal()

export function getElementSize (el, isFragment) {
  function getSize (el) {
    return {
      width: el.offsetWidth,
      height: el.offsetHeight
    }
  }

  let temp = getSize(el)
  if (temp.width || temp.height) return temp

  // clone the el
  let copy = el.cloneNode(true)
  // ste some style to minimize the influence to the document
  copy.setAttribute('style', 'visibility: hidden; display: block !important; position: absolute !important;')

  let res = null
  // insert it to document
  if (isFragment) document.body.appendChild(copy)
  else el.parentNode.insertBefore(copy, el)
  res = getSize(copy)

  // remove it
  if (isFragment) document.body.removeChild(copy)
  else el.parentNode.removeChild(copy)
  return res
}

export function getWindowSize () {
  return {
    width: glo.innerWidth,
    height: glo.innerHeight
  }
}

export let isFirefox = typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().indexOf('firefox') > -1
export function mousewheel (element, handler) {
  if (element && element.addEventListener) {
    element.addEventListener(isFirefox ? 'DOMMouseScroll' : 'mousewheel', handler)
  }
}

function getOriginClasses (el) {
  let originClasses = []
  el.className.split(' ').forEach(cl => {
    if (!isEmptyString(cl)) originClasses.push(cl)
  })
  return originClasses
}
export function addClass (el, className) {
  let originClasses = getOriginClasses(el)
  originClasses.push(className)
  el.className = originClasses.join(' ')
}

export function removeClass (el, className) {
  if (el.className.indexOf(className) !== -1) {
    let originClasses = getOriginClasses(el)
    let temp = []
    originClasses.forEach(cl => {
      if (cl !== className) temp.push(cl)
    })
    el.className = temp.join(' ')
  }
}
