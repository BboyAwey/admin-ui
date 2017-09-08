
export function deepClone (obj) {
  if (!(obj instanceof Array || obj instanceof Object)) throw new Error('can only deepCopy Array or Object')
  return JSON.parse(JSON.stringify(obj))
}

export function isEmptyString (str) {
  return str === '' || /^\s+$/g.test(str)
}

if (!window.adminUiNameSpace) window.adminUiNameSpace = {}
export let namespace = {
  set: function (key, value) {
    window.adminUiNameSpace[key] = value
    return window.adminUiNameSpace[key]
  },
  get: function (key) {
    return window.adminUiNameSpace[key]
  },
  delete: function (key) {
    return delete window.adminUiNameSpace[key]
  }
}

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

export function upload (option) {
  // copy from element
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
export function getDataType (o) {
  // Author: yuhaijun
  // email: yuhaijun@rongcapital.cn
  // get data type
  const regStr = /[^, ]+/g
  var type = {}
  'Boolean Number String Function Array Date RegExp Object Error'.replace(regStr, (name) => {
    type['[object ' + name + ']'] = name.toLowerCase()
  })
  return type[Object.prototype.toString.call(o)]
}
