require('./check-versions')()

process.env.NODE_ENV = 'publish'
let isMin = process.argv[2]

var ora = require('ora')
var rm = require('rimraf')
var fs = require('fs')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.publish.conf')

var spinner = ora('building for publish...')
spinner.start()

webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err

  if (isMin) {
    var fileName = "admin-ui.min.js";

    var sourceFile = path.join(config.publish.assetsRoot, '/min-temp/', fileName)
    var destPath = path.join(config.publish.assetsRoot, fileName)

    var readStream = fs.createReadStream(sourceFile)
    var writeStream = fs.createWriteStream(destPath)
    readStream.pipe(writeStream)

    rm(path.join(config.publish.assetsRoot, '/min-temp/'), err => {
      if (err) throw err
      console.log(chalk.cyan('  Mini file translate done.\n'))
    })
  }

  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  if (stats.hasErrors()) {
    console.log(chalk.red('  Build failed with errors.\n'))
    process.exit(1)
  }

  console.log(chalk.cyan('  Build complete.\n'))
})
