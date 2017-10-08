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
  switch (scene) {
    case 'font':
      res += `.au-theme-font-color--${colorName}{color:${colorNumber}}`
      res += `.au-theme-font-color--${colorName}-important{color:${colorNumber} !important}`
      pseudos.forEach(pseudo => {
        res += `.au-theme-${pseudo}-font-color--${colorName}:${pseudo}{color:${colorNumber}}`
        res += `.au-theme-${pseudo}-font-color--${colorName}-important:${pseudo}{color:${colorNumber} !important}`
      })
      // placeholder color
      res += `.au-theme-placeholder-color--${colorName}::-webkit-input-placeholder{color:${colorNumber}}`
      res += `.au-theme-placeholder-color--${colorName}:-moz-placeholder{color:${colorNumber}}`
      res += `.au-theme-placeholder-color--${colorName}::-moz-placeholder{color:${colorNumber}}`
      res += `.au-theme-placeholder-color--${colorName}:-ms-input-placeholder{color:${colorNumber}}`
      break
    case 'border':
      res += `.au-theme-border-color--${colorName}{border-color:${colorNumber}}`
      res += `.au-theme-border-top-color--${colorName}{border-top-color:${colorNumber}}`
      res += `.au-theme-border-right-color--${colorName}{border-right-color:${colorNumber}}`
      res += `.au-theme-border-bottom-color--${colorName}{border-bottom-color:${colorNumber}}`
      res += `.au-theme-border-left-color--${colorName}{border-left-color:${colorNumber}}`
      res += `.au-theme-border-color--${colorName}-important{border-color:${colorNumber} !important}`
      res += `.au-theme-border-top-color--${colorName}-important{border-top-color:${colorNumber} !important}`
      res += `.au-theme-border-right-color--${colorName}-important{border-right-color:${colorNumber} !important}`
      res += `.au-theme-border-bottom-color--${colorName}-important{border-bottom-color:${colorNumber} !important}`
      res += `.au-theme-border-left-color--${colorName}-important{border-left-color:${colorNumber} !important}`
      pseudos.forEach(pseudo => {
        res += `.au-theme-${pseudo}-border-color--${colorName}:${pseudo}{border-color:${colorNumber}}`
        res += `.au-theme-${pseudo}-border-top-color--${colorName}:${pseudo}{border-top-color:${colorNumber}}`
        res += `.au-theme-${pseudo}-border-rigth-color--${colorName}:${pseudo}{border-right-color:${colorNumber}}`
        res += `.au-theme-${pseudo}-border-bottom-color--${colorName}:${pseudo}{border-bottom-color:${colorNumber}}`
        res += `.au-theme-${pseudo}-border-left-color--${colorName}:${pseudo}{border-left-color:${colorNumber}}`
        res += `.au-theme-${pseudo}-border-color--${colorName}-important:${pseudo}{border-color:${colorNumber} !important}`
        res += `.au-theme-${pseudo}-border-top-color--${colorName}-important:${pseudo}{border-top-color:${colorNumber} !important}`
        res += `.au-theme-${pseudo}-border-right-color--${colorName}-important:${pseudo}{border-right-color:${colorNumber} !important}`
        res += `.au-theme-${pseudo}-border-bottom-color--${colorName}-important:${pseudo}{border-bottom-color:${colorNumber} !important}`
        res += `.au-theme-${pseudo}-border-left-color--${colorName}-important:${pseudo}{border-left-color:${colorNumber} !important}`
      })
      break
    case 'background':
      res += `.au-theme-background-color--${colorName}{background-color:${colorNumber}}`
      res += `.au-theme-background-color--${colorName}-important{background-color:${colorNumber} !important}`
      pseudos.forEach(pseudo => {
        res += `.au-theme-${pseudo}-background-color--${colorName}:${pseudo}{background-color:${colorNumber}}`
        res += `.au-theme-${pseudo}-background-color--${colorName}-important:${pseudo}{background-color:${colorNumber} !important}`
      })
      break
  }
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
    res += `.au-theme-top-left-radius{border-top-left-radius:${radius}px}`
    res += `.au-theme-top-right-radius{border-top-right-radius:${radius}px}`
    res += `.au-theme-bottom-left-radius{border-bottom-left-radius:${radius}px}`
    res += `.au-theme-bottom-right-radius{border-bottom-right-radius:${radius}px}`
    res += `.au-theme-radius--important{border-radius:${radius}px !important}`
    res += `.au-theme-top-left-radius--important{border-top-left-radius:${radius}px !important}`
    res += `.au-theme-top-right-radius--important{border-top-right-radius:${radius}px !important}`
    res += `.au-theme-bottom-left-radius--important{border-bottom-left-radius:${radius}px !important}`
    res += `.au-theme-bottom-right-radius--important{border-bottom-right-radius:${radius}px !important}`
    pseudos.forEach(pseudo => {
      res += `.au-theme-${pseudo}-radius:${pseudo}{border-radius:${radius}px}`
      res += `.au-theme-${pseudo}-radius-important:${pseudo}{border-radius:${radius}px !important}`
      res += `.au-theme-${pseudo}-top-left-radius:${pseudo}{border-top-left-radius:${radius}pxj}`
      res += `.au-theme-${pseudo}-top-left-radius--important:${pseudo}{border-top-left-radius:${radius}px !important}`
      res += `.au-theme-${pseudo}-top-right-radius:${pseudo}{border-top-right-radius:${radius}px}`
      res += `.au-theme-${pseudo}-top-right-radius--important:${pseudo}{border-top-right-radius:${radius}px !important}`
      res += `.au-theme-${pseudo}-bottom-left-radius:${pseudo}{border-bottom-left-radius:${radius}px}`
      res += `.au-theme-${pseudo}-bottom-left-radius--important:${pseudo}{border-bottom-left-radius:${radius}px !important}`
      res += `.au-theme-${pseudo}-bottom-right-radius:${pseudo}{border-bottom-right-radius:${radius}px}`
      res += `.au-theme-${pseudo}-bottom-right-radius--important:${pseudo}{border-bottom-right-radius:${radius}px !important}`
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
      throw new Error('Admin UI@theme-system@ theme.colors should be an object')
    }
    if (theme.shadows && typeof theme.shadows === 'object') {
      Object.assign(finalTheme.shadows, theme.shadows)
    } else {
      throw new Error('Admin UI@theme-system@ theme.shadows should be an object')
    }
    if (theme.borderRadius !== undefined) finalTheme.borderRadius = theme.borderRadius
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
