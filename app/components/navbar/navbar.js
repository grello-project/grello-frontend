'use strict'

require('./_navbar.scss')

module.exports = {
  template: require('./navbar.html'),
  controller: ['$log', '$location', '$rootScope', 'authService', NavbarController],
  controllerAs: 'navbarCtrl'
}

function NavbarController($log, $location, $rootScope, authService){
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
  }

  const deregistrationCallback = $rootScope.$on('$locationChangeSuccess', () => {
    this.checkPath()
  })

  $rootScope.$on('$destroy', deregistrationCallback)
}
