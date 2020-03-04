var path = require('path');
var utils = require('./utils');
var config = require('../config');
var vueLoaderConfig = require('./vue-loader.conf');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
var src = path.resolve(__dirname, '../src');

module.exports = {
  entry: {
    app: './src/main.js'
  },
  node: {
    fs: 'empty'
  },
  output: {
    path: process.env.NODE_ENV === 'productionen' ? config.builden.assetsRoot : config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV !== 'development' ? process.env.NODE_ENV === 'productionen' ? config.builden.assetsPublicPath : config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, '../src'),
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components'),
      'views': path.resolve(__dirname, '../src/views'),
      'styles': path.resolve(__dirname, '../src/styles'),
      'api': path.resolve(__dirname, '../src/api'),
      'utils': path.resolve(__dirname, '../src/utils'),
      'store': path.resolve(__dirname, '../src/store'),
      'router': path.resolve(__dirname, '../src/router'),
      'mock': path.resolve(__dirname, '../src/mock'),
      'vendor': path.resolve(__dirname, '../src/vendor'),
      'static': path.resolve(__dirname, '../static')
    }
  },
  externals: {
    jquery: 'jQuery'
  },
  module: {
    rules: [
      // {
      //   test: /\.(js|vue)$/,
      //   loader: 'eslint-loader',
      //   enforce: "pre",
      //   include: [resolve('src'), resolve('test')],
      //   exclude: [/node_modules/, resolve('static'), resolve('src/assets'), resolve('src/vendor')],
      //   options: {
      //     formatter: require('eslint-friendly-formatter')
      //   }
      // },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        include: [resolve('src'), resolve('test')],
        loader: 'babel-loader?cacheDirectory'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'img/[name].[hash:7].[ext]',
            publicPath: function (data) {
              return '../' + data;
            }
          }
        }]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'fonts/[name].[hash:7].[ext]',
            publicPath: function (data) {
              return '../' + data;
            }
          }
        }]
      }
    ]
  },
  plugins: []
}