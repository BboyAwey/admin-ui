var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'publish'

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: process.env.NODE_ENV === 'production'
      ? config.build.productionSourceMap
      : (process.env.NODE_ENV === 'publish'
      ? config.publish.productionSourceMap
      : config.dev.cssSourceMap),
    extract: isProduction
  }),
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
