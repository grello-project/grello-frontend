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

  const googleAuthBase = 'https://accounts.google.com/o/oauth2/v2/auth'
  const googleAuthResponseType = 'response_type=code'
  const googleAuthClientID = `client_id=${__CLIENT_ID__}`
  const googleAuthScope = 'scope=profile%20email%20openid%20https://www.googleapis.com/auth/drive'
  const googleAuthRedirectURI = 'redirect_uri=http://localhost:3000/auth/google/callback'
  const googleAuthAccessType = 'access_type=offline'
  const googleAuthPrompt = 'prompt=consent'

  this.googleAuthURL = `${googleAuthBase}?${googleAuthResponseType}&${googleAuthClientID}&${googleAuthScope}&${googleAuthRedirectURI}&${googleAuthAccessType}&${googleAuthPrompt}`
}
