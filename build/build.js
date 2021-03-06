require('./check-versions')();
var server = require('pushstate-server');
var opn = require('opn')
var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack');
var config = require('../config');
var webpackConfig = require('./webpack.prod.conf');
var child_process = require('child_process');
console.log("staty..................................")
var spinner = ora('building for ' + process.env.NODE_ENV + '...')
spinner.start()

rm(path.join(process.env.NODE_ENV === 'productionen'?config.builden.assetsRoot:config.build.assetsRoot, process.env.NODE_ENV === 'productionen'?config.builden.assetsSubDirectory:config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')
    child_process.exec('git show >> ./dist/info.txt',function (error, stdout, stderr) {
      if (error !== null) {
        console.log('exec error: ' + error);
      }
      console.log(chalk.cyan('write info.txt ok!\n'))
    });
    console.log(chalk.cyan('Build complete.\n'))

    if (process.env.npm_config_preview) {
      server.start({
        port: 9528,
        directory: './dist',
        file: '/index.html'
      });
      console.log('> Listening at ' + 'http://localhost:9528' + '\n')
    }
  })
})