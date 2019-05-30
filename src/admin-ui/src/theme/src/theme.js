import themeClassGenerator from 'theme-class-generator'
import { namespace, deepClone } from 'helpers/utils'
import defaultConfig from './default'

function isObject (obj, name) {
  let res = typeof obj === 'object'
  if (!res) {
    console.error(`Admin UI @ theme-system @ theme config ${name || ''} should be an object`)
  }
  return res
}

function absorb (base, target, name) {
  if (!isObject(base, name) || !isObject(target, name)) return
  for (let key in base) {
    if (typeof base[key] !== 'object') {
      base[key] = target[key] || base[key]
    } else if (base[key] && target[key]) {
      absorb(base[key], target[key], key)
    }
  }
}

export default function (config) {
  let finalConfig = deepClone(defaultConfig)
  absorb(finalConfig, config || {})
  // save theme to namespace
  namespace.set('theme', finalConfig)

  let styleTag = document.querySelector('style#admin-ui-theme') || document.createElement('style')
  styleTag.id = 'admin-ui-theme'
  styleTag.innerHTML = themeClassGenerator(finalConfig)
  document.body.appendChild(styleTag)
}
