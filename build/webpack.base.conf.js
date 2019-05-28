const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const friendlyFommater = require('eslint-friendly-formatter')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const chalk = require('chalk')
var Spinner = require('cli-spinner').Spinner

process.stdout.write(chalk.cyan('Let\'s go! \n'))
var spinner = new Spinner(chalk.green('%s Building Admin UI..'))
spinner.setSpinnerString('⣾⣽⣻⢿⡿⣟⣯⣷')
spinner.start()

function resolve (dir) {
  return path.resolve(__dirname, dir)
}

module.exports = {
  entry: {
    index: resolve('../src/admin-ui/src/index.js')
  },
  output: {
    path: resolve('../src/admin-ui/dist'),
    pathinfo: false,
    filename: '[name].js',
    // tag
    library: 'AdminUi',
    libraryTarget: 'amd'
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
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[ext]',
          publicPath: 'assets'
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
  plugins: [
    new webpack.ProgressPlugin((percentage, msg, ...args) => {
      spinner.setSpinnerTitle(chalk.green('%s ' + parseInt(percentage * 100) + '%' + ' Building Admin UI..'))
      if (percentage === 1) {
        spinner.stop()
        process.stdout.write('\n')
      }
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}
