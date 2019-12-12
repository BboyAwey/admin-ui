export default {
  theme: {
    colors: { // 彩色配置，默认配置如下
      // primary: '#1c86e2',
      // success: '#0cb470',
      // danger: '#ea3a46',
      // warning: '#f5ae08',
      // info: '#68217a'
      primary: '#2196f3',
      success: '#4caf50',
      danger: '#f44336',
      warning: '#ff9800',
      info: '#607d8b'
    },
    shadows: { // 阴影配置，默认配置如下
      // primary: '0 0 4px #1c86e2',
      // info: '0 0 4px #68217a',
      // warning: '0 0 4px #f5ae08',
      // danger: '0 0 4px #ea3a46',
      // success: '0 0 4px #0cb470'
    },
    radiuses: {
      small: '3px',
      large: '5px'
    }
  },
  prefix: 'au-theme', // 样式类的前缀
  lightnessReverse: false, // 反转lightness排序（黑白主题）
  colorTopBottom: 5, // top和bottom颜色距离纯黑和纯白的lightness的距离，越小越接近纯黑纯白
  colorUpDown: 10, // 彩色上下接近色与正色的lightness距离
  baseColorLeve: 12, // 无彩色分级数量
  baseColorHue: '20%', // 无彩色饱和度
  baseShadowOpacity: 0.2, // 无彩色阴影不透明度
  colorShadowOpacity: 0.6 // 彩色阴影不透明度
}
