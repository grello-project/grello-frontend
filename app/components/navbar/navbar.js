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

  this.logout = function() {
    authService.logout()
    profileService.getUser()
  }

  $rootScope.$on('$locationChangeSuccess', () => {
    this.checkPath()
  })

}
