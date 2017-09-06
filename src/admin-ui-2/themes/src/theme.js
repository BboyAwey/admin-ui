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

const genStyle = function (scene, colorName, colorNumber) {
  let res = ''
  res += `.au-theme-${scene}-color-${colorName}{${scene === 'font' ? '' : (scene + '-')}color:${colorNumber};}`
  pseudos.forEach(pseudo => {
    res += `.au-theme-${scene}-color-${colorName}:${pseudo}{${scene === 'font' ? '' : (scene + '-')}color:${colorNumber};}`
  })
  return res
}

export default function (theme) {
  let finalTheme = JSON.parse(JSON.stringify(light))
  if (theme === 'dark') finalTheme = JSON.parse(JSON.stringify(dark))
  else if (typeof theme === 'object') {
    if (theme.colors && typeof theme.colors === 'object') {
      Object.assign(finalTheme.colors, theme.colors)
    } else {
      throw new Error('Admin UI@ theme.colors should be an object')
    }
    if (typeof theme.neutrals === 'object') {
      for (let key in theme.neutrals) {
        Object.assign(finalTheme.neutrals[key], theme.neutrals[key])
      }
    } else {
      throw new Error('Admin UI@ theme.neutrals should be an object')
    }
  }

  let { colors, neutrals } = finalTheme
  let res = ''
  scenes.forEach(scene => {
    // generate color
    for (let color in colors) {
      res += genStyle(scene, color, colors[color])
    }
    // generate neutral
    for (let color in neutrals[scene]) {
      res += genStyle(scene, color, neutrals[scene][color])
    }
  })
  return res
}
