import { deepClone, namespace } from '../../helpers/utils'
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
const genShadowStyle = function (shadowName, shadowValue) {
  let res = ''
  res += `.au-theme-box-shadow--${shadowName}{box-shadow:${shadowValue}}`
  res += `.au-theme-box-shadow--${shadowName}-important{box-shadow:${shadowValue} !important}`
  pseudos.forEach(pseudo => {
    res += `.au-theme-${pseudo}-box-shadow--${shadowName}:${pseudo}{box-shadow:${shadowValue}}`
    res += `.au-theme-${pseudo}-box-shadow--${shadowName}-important:${pseudo}{box-shadow:${shadowValue} !important}`
  })
  return res
}
const genRadiusStyle = function (radiosName, radius) {
  let res = ''
  res += `.au-theme-border-radius--${radiosName}{border-radius:${radius}}`
  res += `.au-theme-border-top-left-radius--${radiosName}{border-top-left-radius:${radius}}`
  res += `.au-theme-border-top-right-radius--${radiosName}{border-top-right-radius:${radius}}`
  res += `.au-theme-border-bottom-left-radius--${radiosName}{border-bottom-left-radius:${radius}}`
  res += `.au-theme-border-bottom-right-radius--${radiosName}{border-bottom-right-radius:${radius}}`
  res += `.au-theme-border-radius--${radiosName}-important{border-radius:${radius}px !important}`
  res += `.au-theme-border-top-left-radius--${radiosName}-important{border-top-left-radius:${radius} !important}`
  res += `.au-theme-border-top-right-radius--${radiosName}-important{border-top-right-radius:${radius} !important}`
  res += `.au-theme-border-bottom-left-radius--${radiosName}-important{border-bottom-left-radius:${radius} !important}`
  res += `.au-theme-border-bottom-right-radius--${radiosName}-important{border-bottom-right-radius:${radius} !important}`
  pseudos.forEach(pseudo => {
    res += `.au-theme-${pseudo}-border-radius--${radiosName}:${pseudo}{border-radius:${radius}px}`
    res += `.au-theme-${pseudo}-border-radius--${radiosName}-important:${pseudo}{border-radius:${radius}px !important}`
    res += `.au-theme-${pseudo}-border-top-left-radius--${radiosName}:${pseudo}{border-top-left-radius:${radius}pxj}`
    res += `.au-theme-${pseudo}-border-top-left-radius--${radiosName}-important:${pseudo}{border-top-left-radius:${radius}px !important}`
    res += `.au-theme-${pseudo}-border-top-right-radius--${radiosName}:${pseudo}{border-top-right-radius:${radius}px}`
    res += `.au-theme-${pseudo}-border-top-right-radius--${radiosName}-important:${pseudo}{border-top-right-radius:${radius}px !important}`
    res += `.au-theme-${pseudo}-border-bottom-left-radius--${radiosName}:${pseudo}{border-bottom-left-radius:${radius}px}`
    res += `.au-theme-${pseudo}-border-bottom-left-radius--${radiosName}-important:${pseudo}{border-bottom-left-radius:${radius}px !important}`
    res += `.au-theme-${pseudo}-border-bottom-right-radius--${radiosName}:${pseudo}{border-bottom-right-radius:${radius}px}`
    res += `.au-theme-${pseudo}-border-bottom-right-radius--${radiosName}-important:${pseudo}{border-bottom-right-radius:${radius}px !important}`
  })
  return res
}

function themeGenerator (theme) {
  let finalTheme = deepClone(light)
  if (theme === 'dark') finalTheme = deepClone(dark)
  else if (typeof theme === 'object') {
    // merge colors
    for (let name in theme) {
      if (theme[name]) {
        if (typeof theme[name] === 'object') {
          Object.assign(finalTheme[name], theme[name])
        } else {
          console.error(`Admin UI@theme-system@ theme.${name} should be an object`)
        }
      }
    }
  }

  let { colors, shadows, radiuses } = finalTheme
  let res = ''
  scenes.forEach(scene => {
    // generate color
    for (let color in colors) {
      res += genColorStyle(scene, color, colors[color])
    }
  })
  // generate shadow
  for (let shadowName in shadows) {
    res += genShadowStyle(shadowName, shadows[shadowName])
  }
  // generate border-radius
  for (let radiusName in radiuses) {
    res += genRadiusStyle(radiusName, radiuses[radiusName])
  }

  // save theme to namespace
  namespace.set('theme', finalTheme)

  return res
}

export default function (theme) {
  let styleTag = document.querySelector('style#admin-ui-theme') || document.createElement('style')

  styleTag.id = 'admin-ui-theme'
  styleTag.innerHTML = themeGenerator(theme)
  document.body.appendChild(styleTag)
}
