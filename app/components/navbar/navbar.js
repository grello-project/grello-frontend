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
    if (path === '/join'){
      this.hideButtons = true
      this.hideLogButtons = false
    } else {
      this.hideButtons = false
      this.hideLogButtons = true
    }
  }

  this.checkPath()

}
