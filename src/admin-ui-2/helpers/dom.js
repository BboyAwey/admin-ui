import { isEmptyString, getGlobal } from './utils'
let glo = getGlobal()

export function getElementSize (el, isFragment) {
  // Author: Awey
  // email: chenwei@rongcapital.cn
  // github: https://github.com/BboyAwey
  // blog: http://www.jianshu.com/u/3c8fe1455914
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
  else console.log(el) && el.parentNode.insertBefore(copy, el)
  res = getSize(copy)
  // remove it
  if (isFragment) document.body.removeChild(copy)
  else el.parentNode.removeChild(copy)
  return res
}

export function getWindowSize () {
  // Author: Awey
  // email: chenwei@rongcapital.cn
  // github: https://github.com/BboyAwey
  // blog: http://www.jianshu.com/u/3c8fe1455914
  return {
    width: glo.innerWidth,
    height: glo.innerHeight
  }
}

export let isFirefox = typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().indexOf('firefox') > -1
export function mousewheel (element, handler) {
  // Author: Awey
  // email: chenwei@rongcapital.cn
  // github: https://github.com/BboyAwey
  // blog: http://www.jianshu.com/u/3c8fe1455914
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
  // Author: Awey
  // email: chenwei@rongcapital.cn
  // github: https://github.com/BboyAwey
  // blog: http://www.jianshu.com/u/3c8fe1455914
  let originClasses = getOriginClasses(el)
  originClasses.push(className)
  el.className = originClasses.join(' ')
}

export function removeClass (el, className) {
  // Author: Awey
  // email: chenwei@rongcapital.cn
  // github: https://github.com/BboyAwey
  // blog: http://www.jianshu.com/u/3c8fe1455914
  if (el.className.indexOf(className) !== -1) {
    let originClasses = getOriginClasses(el)
    let temp = []
    originClasses.forEach(cl => {
      if (cl !== className) temp.push(cl)
    })
    el.className = temp.join(' ')
  }
}
