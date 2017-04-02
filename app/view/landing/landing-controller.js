'use strict'

require('./_landing.scss')

module.exports = {
  template: require('./landing.html'),
  controller: ['$log', '$location', '$rootScope', 'authService', LandingController],
  controllerAs: 'landingCtrl'
}

function  LandingController($log, $location, authService) {
  let url = $location.url()
  url === '/join'
}
