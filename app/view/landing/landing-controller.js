'use strict'

require('./_landing.scss')

module.exports = [
  '$log',
  '$location',
  '$rootScope',
  'authService',
  LandingController
]

function  LandingController($log, $location, $rootScope, authService) {
  let url = $location.url()
  authService
    .getToken()
    .then( token => {
      $location.url('/tasks')
    })
    .catch( err => {
      $log.debug(err)
      $location.url('/')
    })
}
