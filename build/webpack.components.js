const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const friendlyFommater = require('eslint-friendly-formatter')
const chalk = require('chalk')
const Spinner = require('cli-spinner').Spinner
const nodeExternals = require('webpack-node-externals')

const config = require('./config')

// console.log(Object.assign({}, config.components, config.directives, config.helpers, config.theme))

process.stdout.write('\n')
var spinner = new Spinner(chalk.green('%s Building Admin UI Components..'))
spinner.setSpinnerString('⣾⣽⣻⢿⡿⣟⣯⣷')
spinner.start()

module.exports = {
  mode: 'production',
  entry: Object.assign({}, config.components, config.directives, config.helpers, config.theme),
  output: {
    path: path.resolve(__dirname, '../src/admin-ui/dist/'),
    // publicPath: '/dist/',
    pathinfo: false,
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
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
        include: [path.resolve(__dirname, '../src'), path.resolve(__dirname, '../tests')],
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
          name: 'assets/[name].[ext]',
          publicPath: 'assets'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: config.alias
  },
  externals: Object.assign({}, config.externals, nodeExternals()),
  optimization: {
    minimize: false,
    sideEffects: false
  },
  plugins: [
    new webpack.ProgressPlugin((percentage, msg, ...args) => {
      spinner.setSpinnerTitle(chalk.green('%s ' + parseInt(percentage * 100) + '%' + ' Building admin-ui components.. ' + args[0]))
      if (percentage === 1) {
        spinner.stop()
        process.stdout.write('\n')
      }
    }),
    new VueLoaderPlugin()
  ]
}
