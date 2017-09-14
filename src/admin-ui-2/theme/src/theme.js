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
  'hover',
  'active',
  'focus',
  'first-child',
  'last-child',
  'before',
  'after',
  'enabled',
  'disabled',
  'checked'
]
const radius = 3

const genColorStyle = function (scene, colorName, colorNumber) {
  let res = ''
  res += `.au-theme-${scene}-color--${colorName}{${scene === 'font' ? '' : (scene + '-')}color:${colorNumber}}`
  res += `.au-theme-${scene}-color--${colorName}-important{${scene === 'font' ? '' : (scene + '-')}color:${colorNumber} !important}`
  pseudos.forEach(pseudo => {
    res += `.au-theme-${pseudo}-${scene}-color--${colorName}:${pseudo}{${scene === 'font' ? '' : (scene + '-')}color:${colorNumber}}`
    res += `.au-theme-${pseudo}-${scene}-color--${colorName}-important:${pseudo}{${scene === 'font' ? '' : (scene + '-')}color:${colorNumber} !important}`
  })
  return res
}
const genShadowStyle = function (level, value) {
  let res = ''
  res += `.au-theme-shadow--${level}{box-shadow:${value}}`
  res += `.au-theme-shadow--${level}-important{box-shadow:${value} !important}`
  pseudos.forEach(pseudo => {
    res += `.au-theme-${pseudo}-shadow--${level}:${pseudo}{box-shadow:${value}}`
    res += `.au-theme-${pseudo}-shadow--${level}-important:${pseudo}{box-shadow:${value} !important}`
  })
  return res
}
const genRadiusStyle = function (borderRadius) {
  let res = ''
  if (borderRadius) {
    res += `.au-theme-radius{border-radius:${radius}px}`
    res += `.au-theme-radius--important{border-radius:${radius}px !important}`
    pseudos.forEach(pseudo => {
      res += `.au-theme-${pseudo}-radius:${pseudo}{border-radius:${radius}px}`
      res += `.au-theme-${pseudo}-radius-important:${pseudo}{border-radius:${radius}px !important}`
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

  let { colors, shadows, borderRadius } = finalTheme
  let res = ''
  scenes.forEach(scene => {
    // generate color
    for (let color in colors) {
      res += genColorStyle(scene, color, colors[color])
    }
  })
  // generate shadow
  for (let level in shadows) {
    res += genShadowStyle(level, shadows[level])
  }
  // generate border-radius
  res += genRadiusStyle(borderRadius)
  // console.log(res)
  return res
}
