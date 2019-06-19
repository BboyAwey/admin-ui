import { isEmptyString } from 'helpers/utils'

// class
function getOriginClasses (el) {
  let originClasses = []
  el.className.split(' ').forEach(cl => {
    if (!isEmptyString(cl)) originClasses.push(cl)
  })
  return originClasses
}
export const addClass = (el, className) => {
  if (!el.className) el.className = className
  else if (el.className.indexOf(className) === -1) {
    let originClasses = getOriginClasses(el)
    originClasses.push(className)
    el.className = originClasses.join(' ')
  }
}

export const removeClass = (el, className) => {
  if (el.className.indexOf(className) !== -1) {
    let originClasses = getOriginClasses(el)
    let temp = []
    originClasses.forEach(cl => {
      if (cl !== className) temp.push(cl)
    })
    el.className = temp.join(' ')
  }
}

export const hasClass = (el, className) => {
  return getOriginClasses(el).indexOf(className.trim()) !== -1
}

// upload

function getError (action, option, xhr) {
  let msg
  if (xhr.response) {
    msg = `${xhr.status} ${xhr.response.error || xhr.response}`
  } else if (xhr.responseText) {
    msg = `${xhr.status} ${xhr.responseText}`
  } else {
    msg = `fail to post ${action} ${xhr.status}`
  }

  const err = new Error(msg)
  err.status = xhr.status
  err.method = 'post'
  err.url = action
  return err
}

function getBody (xhr) {
  const text = xhr.responseText || xhr.response
  if (!text) {
    return text
  }

  try {
    return JSON.parse(text)
  } catch (e) {
    return text
  }
}

export const upload = option => {
  // ### option
  // * option.action // submit url
  // * option.data // submit data
  // * option.withCredentials // indicates whether or not cross-site Access-Control requests should be made using credentials such as cookies or authorization headers
  // * option.headers // change or set headers

  // ### file
  // * option.file
  // * option.filename

  // ### events
  // * option.onProgress(e)
  // * option.onError(e)
  // * option.onSuccess()

  if (typeof window.XMLHttpRequest === 'undefined') {
    return
  }

  const xhr = new window.XMLHttpRequest()
  const action = option.action

  if (xhr.upload) {
    if (option.onProgress) {
      xhr.upload.onprogress = function progress (e) {
        if (e.total > 0) {
          e.percent = e.loaded / e.total * 100
        }
        option.onProgress(e, option.index)
      }
    }
  }

  const formData = new window.FormData()

  if (option.data) {
    Object.keys(option.data).map(key => {
      formData.append(key, option.data[key])
    })
  }

  formData.append(option.filename, option.file)

  xhr.onerror = function error (e) {
    if (option.onError) option.onError(e, option.index)
  }

  xhr.onload = function onload () {
    if (xhr.status < 200 || xhr.status >= 300) {
      return option.onError ? option.onError(getError(action, option, xhr), option.index) : false
    }
    if (option.onSuccess) option.onSuccess(getBody(xhr), option.index)
  }

  xhr.open(option.method || 'post', action, true)

  if (option.withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true
  }

  const headers = option.headers || {}

  for (let item in headers) {
    if (headers.hasOwnProperty(item) && headers[item] !== null) {
      xhr.setRequestHeader(item, headers[item])
    }
  }
  xhr.send(formData)
  return xhr
}

// get element size
function getSize (el) {
  // let computed = window.getComputedStyle(el)
  // let rect = el.getBoundingClientRect()
  // return {
  //   width: el.offsetWidth || rect.width || parseInt(computed.width) || 0,
  //   height: el.offsetHeight || rect.height || parseInt(computed.height) || 0
  // }
  return {
    width: el.offsetWidth || 0,
    height: el.offsetHeight || 0
  }
}

export const getElementSize = (el, isFragment) => {
  let temp = getSize(el)
  if (temp.width || temp.height) return temp

  // clone the el
  let copy = el.cloneNode(true)
  // ste some style to minimize the influence to the document
  // if (isFragment) copy.setAttribute('style', 'visibility:hidden !important; display:block !important;')
  // else copy.setAttribute('style', 'visibility:hidden !important;')
  copy.style.visibility = 'hidden'
  copy.style.display = 'block'
  copy.style.position = 'absolute'
  copy.style.top = '-9999999px'
  copy.style.left = '-9999999px'

  let res = null
  // insert it to document
  // if (isFragment) document.body.appendChild(copy)
  // else el.parentNode.insertBefore(copy, el)
  document.body.appendChild(copy)
  res = getSize(copy)

  // remove it
  // if (isFragment) document.body.removeChild(copy)
  // else el.parentNode.removeChild(copy)
  document.body.removeChild(copy)
  return res
}

// get window size
export const getWindowSize = () => {
  // 获取窗口宽度
  if (window.innerWidth) {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  } else if (document.body.clientWidth) {
    return {
      width: document.body.clientWidth,
      height: document.body.clientHeight
    }
  }
}

// mouse wheel
const isFirefox =
  typeof navigator !== 'undefined' &&
  navigator.userAgent.toLowerCase().indexOf('firefox') > -1

export const mousewheel = (action, element, handler) => {
  if (element && element[action + 'EventListener']) {
    element[action + 'EventListener'](
      isFirefox
        ? 'DOMMouseScroll'
        : 'mousewheel',
      handler,
      { passive: true }
    )
  }
}

// is ancestor
export const isAncestor = (el, ancestor) => {
  let parent = el
  if (parent === ancestor) return true
  else if (el.parentNode) return isAncestor(el.parentNode, ancestor)
  else return false
}
