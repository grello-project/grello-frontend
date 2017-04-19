'use strict'

require('./scss/main.scss')

const path = require('path')
const angular = require('angular')
const camelcase = require('camelcase')
const pascalcase = require('pascalcase')
const uiRouter = require('angular-ui-router')
const ngTouch = require('angular-touch')
const ngAnimate = require('angular-animate')
const uiBootstrap = require('angular-ui-bootstrap')
const dndLists = require('angular-drag-and-drop-lists')

// https://github.com/timruffles/ios-html5-drag-drop-shim
const iosDragDropShim = require('drag-drop-webkit-mobile')
iosDragDropShim({
  holdToDrag: 300,
  // requireExplicitDraggable: true,
  enableEnterLeave: true
})

angular.module('wattle', [ngTouch, ngAnimate, uiRouter, uiBootstrap, dndLists])

angular.module('wattle').config(['$httpProvider', corsSettings])

function corsSettings ($httpProvider) {
  $httpProvider.defaults.useXDomain = true
}

let context = require.context('./config/', true, /\.js$/)
context.keys().forEach( path => {
  angular.module('wattle').config(context(path))
})

context = require.context('./view/', true, /\.js$/)
context.keys().forEach( key => {
  let name = pascalcase(path.basename(key, '.js'))
  let module = context(key)
  angular.module('wattle').controller(name, module)
})

context = require.context('./service/', true, /\.js$/)
context.keys().forEach( key => {
  let name = camelcase(path.basename(key, '.js'))
  let module = context(key)
  angular.module('wattle').factory(name, module)
})

context = require.context('./components/', true, /\.js$/)
context.keys().forEach( key => {
  let name = camelcase(path.basename(key, '.js'))
  let module = context(key)
  angular.module('wattle').component(name, module)
})

context = require.context('./filter/', true, /\.js$/)
context.keys().forEach( key => {
  let name = camelcase(path.basename(key, '.js'))
  let module = context(key)
  angular.module('wattle').filter(name, module)
})
