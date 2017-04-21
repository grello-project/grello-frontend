'use strict'

require('./_navbar.scss')

module.exports = {
  template: require('./navbar.html'),
  controller: ['$log', '$location', '$rootScope', 'authService', 'profileService', NavbarController],
  controllerAs: 'navbarCtrl'
}

function NavbarController($log, $location, $rootScope, authService, profileService){
  // $log.debug('NavbarController')

  this.checkPath = function() {
    let path = $location.path()
    $log.debug('THE PATH', path)
    if (path === '/join' ){
      this.hideButtons = true
      this.hideLogButtons = false
    } else {
      this.hideButtons = false
      this.hideLogButtons = true
    }
  }

  this.googleAuthURL = `${__API_URL__}/gapi/auth`

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
