import isEmptyString from '../utils/is-empty-string'

function getOriginClasses (el) {
  let originClasses = []
  el.className.split(' ').forEach(cl => {
    if (!isEmptyString(cl)) originClasses.push(cl)
  })
  return originClasses
}
export function addClass (el, className) {
  if (el.className.indexOf(className) === -1) {
    let originClasses = getOriginClasses(el)
    originClasses.push(className)
    el.className = originClasses.join(' ')
  }
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

export function hasClass (el, className) {
  return getOriginClasses(el).indexOf(className.trim()) !== -1
}
