'use strict'

require('./_landing.scss')

module.exports = ['$log', '$location', '$rootScope', 'authService', LandingController]

function LandingController($log, $location, $rootScope, authService) {
  $log.debug('LandingController')

  const token = $location.search().token

  if(token){
    authService.setToken(token)
    .then(() => {
      $location.url('/tasks')
    })
  }

  authService
    .getToken()
    .then( token => {
      $location.url('/tasks')
    })
    .catch( err => {
      $log.debug(err)
      $location.url('/')
    })

  this.googleAuthURL = 'http://localhost:3000/gapi/auth'
}
