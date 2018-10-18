require('./check-versions')()

process.env.NODE_ENV = 'publish'
let isMin = process.argv[2]

var ora = require('ora')
var rm = require('rimraf')
var fs = require('fs')
var MemoryFS = require('memory-fs')
var mfs = new MemoryFS()
var exec = require('child_process').exec
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var webpackConfig = require('./webpack.publish.conf')

function getFolders(dir) {
  return fs.readdirSync(dir).filter(function (file) {
    return fs.statSync(path.join(dir, file)).isDirectory()
  })
}

function packTheme () {
  let originEntry = Object.assign(webpackConfig.entry)
  let originOutput = webpackConfig.output.path
  let originOutputFilename = webpackConfig.output.filename
  let originOutputLibrary = webpackConfig.output.library
  webpackConfig.entry = {
    'theme': path.join(__dirname, '../src/admin-ui/src/theme/index.js')
  }
  webpackConfig.output.path = path.join(originOutput)
  webpackConfig.output.filename = 'theme.js'
  webpackConfig.output.library = 'admin-ui-theme'
  var spinner = ora(`building for theme...`)
  spinner.start()

  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err

    if (stats.hasErrors()) {
      console.log(chalk.red(` Theme build failed with errors.\n`))
      process.exit(1)
    }

    console.log(chalk.cyan(`Theme build complete.\n`))

    webpackConfig.entry = originEntry
    webpackConfig.output.path = originOutput
    webpackConfig.output.filename = originOutputFilename
    webpackConfig.output.library = originOutputLibrary
  })
}

function packComponent (componentName, index) {
  let originEntry = Object.assign(webpackConfig.entry)
  let originOutput = webpackConfig.output.path
  webpackConfig.entry = {
    [componentName]: path.join(__dirname, '../src/admin-ui/src/components', componentName, 'index.js')
  }
  webpackConfig.output.path = path.join(originOutput, 'lib', componentName)
  webpackConfig.output.library = webpackConfig.output.library + '-' + componentName
  var spinner = ora(`building for ${componentName}...`)
  spinner.start()

  let compiler = webpack(webpackConfig)
  compiler.outputFileSystem = mfs

  compiler.run((err, stats) => {
    spinner.stop()
    if (err) throw err
    // process.stdout.write(stats.toString({
    //   colors: true,
    //   modules: false,
    //   children: false,
    //   chunks: false,
    //   chunkModules: false
    // }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red(` ${componentName} build failed with errors.\n`))
      process.exit(1)
    }

    console.log(chalk.cyan(`${componentName} ${isMin ? 'min' : ''} build complete.\n`))

    // output to real fs
    const content = mfs.readFileSync(path.join(webpackConfig.output.path, 'index.js'))
    fs.writeFileSync(path.join(originOutput, 'lib', componentName + '.js'), content)

    webpackConfig.entry = originEntry
    webpackConfig.output.path = originOutput
    if (index < folders.length - 1) packComponent(folders[index + 1], index + 1)
    else packTheme()
  })
}

let folders = getFolders(path.join(__dirname, '../src/admin-ui/src/components'))

if (!fs.existsSync(path.join(webpackConfig.output.path))) {
  fs.mkdirSync(path.join(webpackConfig.output.path))
}
if (!fs.existsSync(path.join(webpackConfig.output.path, 'lib'))) {
  fs.mkdirSync(path.join(webpackConfig.output.path, 'lib'))
  packComponent(folders[0], 0)
} else {
  exec('rm -rf ' + path.join(webpackConfig.output.path, 'lib'), (err, out) => {
    if (err) console.error(err)
    fs.mkdirSync(path.join(webpackConfig.output.path, 'lib'))
    packComponent(folders[0], 0)
  })
}

