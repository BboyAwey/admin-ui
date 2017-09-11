import { deepClone } from '../../helpers/utils'
import light from './light'
import dark from './dark'

const scenes = [
  'font',
  'border',
  'background'
]
const pseudos = [
  'link',
  'visited',
  'active',
  'hover',
  'focus',
  'first-child',
  'last-child',
  'before',
  'after',
  'enabled',
  'disabled',
  'checked'
]
const shadowLevel = [
  3,
  2,
  1
]
const radius = 3

const genColorStyle = function (scene, colorName, colorNumber) {
  let res = ''
  res += `.au-theme-${scene}-color--${colorName}{${scene === 'font' ? '' : (scene + '-')}color:${colorNumber}}`
  pseudos.forEach(pseudo => {
    res += `.au-theme-${pseudo}-${scene}-color--${colorName}:${pseudo}{${scene === 'font' ? '' : (scene + '-')}color:${colorNumber}}`
  })
  return res
}
const genShadowStyle = function (color, level) {
  let res = ''
  res += `.au-theme-shadow--level-${level}{box-shadow:1px 2px 4px rgba(${color}, .${level})}`
  pseudos.forEach(pseudo => {
    res += `.au-theme-${pseudo}-shadow--level-${level}:${pseudo}{box-shadow:1px 2px 4px rgba(${color}, .${level})}`
  })
  return res
}
const genRadiusStyle = function (borderRadius) {
  let res = ''
  if (borderRadius) {
    res += `.au-theme-radius{border-radius:${radius}px}`
    pseudos.forEach(pseudo => {
      res += `.au-theme-${pseudo}-radius:${pseudo}{border-radius:${radius}px}`
    })
  }
  return res
}

export default function (theme) {
  let finalTheme = deepClone(light)
  if (theme === 'dark') finalTheme = deepClone(dark)
  else if (typeof theme === 'object') {
    if (theme.colors && typeof theme.colors === 'object') {
      Object.assign(finalTheme.colors, theme.colors)
    } else {
      throw new Error('Admin UI@ theme.colors should be an object')
    }
  }

  let { colors, shadowColor, borderRadius } = finalTheme
  let res = ''
  scenes.forEach(scene => {
    // generate color
    for (let color in colors) {
      res += genColorStyle(scene, color, colors[color])
    }
  })
  // generate shadow
  shadowLevel.forEach(level => {
    res += genShadowStyle(shadowColor, level)
  })
  // generate border-radius
  res += genRadiusStyle(borderRadius)
  console.log(res.length)
  return res
}
