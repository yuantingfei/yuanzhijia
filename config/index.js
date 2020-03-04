// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    sitEnv: require('./sit.env'),
    prodEnv: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: '',
    assetsStatic: path.resolve(__dirname, '../dist/static/'),
    assetsPublicPath: './', //生产环境assetsPublicPath: '/'
    staticPath: '/static/', //生产环境 staticPath:''
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  builden: {
    sitEnv: require('./sit.env'),
    prodEnv: require('./proden.env'),
    index: path.resolve(__dirname, '../disten/index.html'),
    assetsRoot: path.resolve(__dirname, '../disten'),
    assetsSubDirectory: '',
    assetsStatic: path.resolve(__dirname, '../disten/static/'),
    assetsPublicPath: './', //生产环境assetsPublicPath: '/'
    staticPath: '/static/', //生产环境 staticPath:''
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 9999,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    staticPath: '/static/',
    browser: 'chrome',
    proxyTable: {
      '/api/v1/': {
        // target: 'http://127.0.0.1:8000',
        target: 'http://106.54.102.72:8001',
        secure: false,
        changeOrigin: true,
        // pathRewrite: {
        //   '^/api': ''
        //  }
      },
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: true
  }
}