'use strict'

require('./_navbar.scss')

module.exports = {
  template: require('./navbar.html'),
  controller: ['$log', '$location', '$rootScope', 'authService', 'profileService', NavbarController],
  controllerAs: 'navbarCtrl'
}

function NavbarController($log, $location, $rootScope, authService, profileService){
  $log.debug('NavbarController')

  this.checkPath = function() {
    let path = $location.path()
    $log.debug('THE PATH', path)
    if (path !== '/tasks' ){
      this.hideButtons = true
      this.hideLogButtons = false
    } else {
      this.hideButtons = false
      this.hideLogButtons = true
    }
  }

  const googleAuthBase = 'https://accounts.google.com/o/oauth2/v2/auth'
  const googleAuthResponseType = 'response_type=code'
  const googleAuthClientID = `client_id=${__CLIENT_ID__}`
  const googleAuthScope = 'scope=profile%20email%20openid%20https://www.googleapis.com/auth/drive'
  const googleAuthRedirectURI = 'redirect_uri=http://localhost:3000/auth/google/callback'
  const googleAuthAccessType = 'access_type=offline'
  const googleAuthPrompt = 'prompt=consent'

  this.googleAuthURL = `${googleAuthBase}?${googleAuthResponseType}&${googleAuthClientID}&${googleAuthScope}&${googleAuthRedirectURI}&${googleAuthAccessType}&${googleAuthPrompt}`

  this.logout = function() {
    authService.logout()
  }


  const deregistrationCallback = $rootScope.$on('$locationChangeSuccess', () => {
    this.checkPath()
    profileService.getUser()
    .then(user => {
      this.user = user
    })
    .catch(err => $log.error(err))
  })

  $rootScope.$on('$destroy', deregistrationCallback)
}
