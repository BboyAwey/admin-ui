var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var vueLoaderConfig = require('./vue-loader.conf')

let args = process.argv.slice(2)
let isMin = args.includes('min')
let isComp = args.includes('comp')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

baseWebpackConfig.entry = {}
baseWebpackConfig.module.rules = [
  {
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: [resolve('src'), resolve('test')],
    options: {
      formatter: require('eslint-friendly-formatter')
    }
  },
  {
    test: /\.vue$/,
    loader: 'vue-loader',
    options: vueLoaderConfig
  },
  {
    test: /\.js$/,
    loader: 'babel-loader',
    include: [resolve('src'), resolve('test')]
  },
  {
    test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: utils.assetsPath((isComp ? '../../' : '') + 'fonts/[name].[ext]')
    }
  }
]


var env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.publish.env

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.publish.productionSourceMap,
      extract: true
    })
  },
  devtool: config.publish.productionSourceMap ? '#source-map' : false,
  entry: {
    adminUi: './src/admin-ui/src/index.js'
  },
  output: {
    path: config.publish[!isMin ? 'distRoot' : 'minRoot'],
    filename: 'index.js',
    publicPath: process.env.NODE_ENV === 'publish'
      ? config.publish.assetsPublicPath
      : config.dev.assetsPublicPath,
    library: 'admin-ui',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('style.css')
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // keep module.id stable when vender modules does not change
    new webpack.HashedModuleIdsPlugin(),
  ]
})

if (isMin) {
  webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }))
}

if (config.publish.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.publish.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.publish.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
