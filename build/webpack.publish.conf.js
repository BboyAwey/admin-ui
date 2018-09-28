var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
// var CopyWebpackPlugin = require('copy-webpack-plugin')
// var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var vueLoaderConfig = require('./vue-loader.conf')
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

baseWebpackConfig.entry = {}
baseWebpackConfig.module.rules = [
  {
    test: /\.vue$/,
    loader: 'vue-loader',
    options: vueLoaderConfig
  },
  {
    test: /\.js$/,
    loader: 'babel-loader',
    include: [resolve('src')]
  },
  {
    test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: utils.assetsPath('fonts/[name].[ext]')
    }
  }
]

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
    path: config.publish.distRoot,
    filename: 'index.js',
    publicPath: config.publish.assetsPublicPath,
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
      'process.env': config.publish.env
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
    new webpack.HashedModuleIdsPlugin()
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'static'
    // })
  ]
})

module.exports = webpackConfig
