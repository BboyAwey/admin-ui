
const config = require('./build/config')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: config.alias
    }
  }
}
