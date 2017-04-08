const webpack = require('./webpack.config.js')
delete webpack.entry

module.exports = function(config) {
  config.set({
    webpack,
    basePath: '',
    frameworks: ['jasmine', 'sinon'],
    files: [
      'app/entry.js',
      'test/**/*-test.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/babel-polyfill/browser.js'
    ],
    exclude: [
    ],
    preprocessors: {
      'test/**/*-test.js': ['webpack'],
      'app/entry.js': ['webpack'],
    },
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false,
    concurrency: Infinity
  })
}
