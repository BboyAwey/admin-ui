const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const friendlyFommater = require('eslint-friendly-formatter')
const chalk = require('chalk')
const Spinner = require('cli-spinner').Spinner

const fs = require('fs')

function getFolders (dir) {
  return fs.readdirSync(dir).filter(function (file) {
    return fs.statSync(path.join(dir, file)).isDirectory()
  })
}

function transformName (dashname) {
  return dashname.split('-').map(t => t[0].toUpperCase() + t.slice(1)).join('')
}

let components = getFolders(path.join(__dirname, '../src/admin-ui/src/components')).reduce((p, c) => {
  p[transformName(c)] = c
  return p
}, {})

process.stdout.write(chalk.cyan('Let\'s go! \n'))
var spinner = new Spinner(chalk.green('%s Building Admin UI Components..'))
spinner.setSpinnerString('⣾⣽⣻⢿⡿⣟⣯⣷')
spinner.start()

function resolve (...dir) {
  return path.resolve(__dirname, ...dir)
}

function resolveComponentPath (name) {
  return resolve(__dirname, '../src/admin-ui/src/components/', name, './index.js')
}

const entry = Object.entries(components).reduce((prev, e) => {
  prev[e[0]] = resolveComponentPath(e[1])
  return prev
}, {})

module.exports = {
  entry,
  output: {
    path: resolve('../src/admin-ui/dist/lib'),
    pathinfo: false,
    filename: '[name].js',
    library: '[name]',
    libraryTarget: 'umd'
  },
  mode: 'none',
  stats: {
    assets: true,
    assetsSort: '!size',
    builtAt: true,
    cached: false,
    cachedAssets: false,
    children: false,
    chunks: false,
    chunkGroups: false,
    chunkModules: false,
    chunkOrigins: false,
    colors: true,
    depth: false,
    entrypoints: false,
    env: false,
    errors: true,
    errorDetails: true,
    hash: false,
    modules: false,
    moduleTrace: false,
    modulesSort: '!size',
    maxModules: 10,
    performance: true,
    providedExports: false,
    publicPath: true,
    reasons: false,
    source: false,
    timings: false,
    usedExports: false,
    version: true,
    warnings: true
  },
  module: {
    rules: [
      {
        test: /\.js|vue$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        exclude: /node_nodules/,
        options: {
          formatter: friendlyFommater,
          emitWarnings: true,
          emitError: true
        }
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.s?css$/,
        use: [
          'vue-style-loader',
          // MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: '../assets/[name].[ext]',
          publicPath: '../assets'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  externals: {
    vue: 'Vue'
  },
  optimization: {
    namedModules: false,
    namedChunks: false,
    flagIncludedChunks: true,
    occurrenceOrder: true,
    // sideEffects: false,
    sideEffects: true,
    usedExports: true,
    concatenateModules: true,
    noEmitOnErrors: true
    // splitChunks: {
    //   hidePathInfo: true,
    //   chunks: 'all',
    //   minSize: 30000,
    //   maxSize: 0,
    //   minChunks: 1,
    //   maxAsyncRequests: 5,
    //   maxInitialRequests: 3,
    //   name: true,
    //   cacheGroups: {
    //     vendors: {
    //       // test: /[\\/]node_modules[\\/]/,
    //       // priority: -10,
    //       filename: '../common/[name].js'
    //     },
    //     styles: {
    //       name: 'styles',
    //       test: /\.css$/,
    //       chunks: 'all',
    //       enforce: true
    //     }
    //   }
    // },
    // runtimeChunk: {
    //   name: '../common/runtime'
    // }
  },
  plugins: [
    new webpack.ProgressPlugin((percentage, msg, ...args) => {
      spinner.setSpinnerTitle(chalk.green('%s ' + parseInt(percentage * 100) + '%' + ' Building Admin UI..'))
      if (percentage === 1) {
        spinner.stop()
        process.stdout.write('\n')
      }
    }),
    new VueLoaderPlugin(),
    // new MiniCssExtractPlugin({
    //   filename: '[name].css'
    // }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}
