'use strict';

require('./_navbar.scss');

module.exports = {
  template: require('./navbar.html'),
  controller: ['$log', '$location', '$rootScope', 'authService', NavbarController],
  controllerAs: 'navbarCtrl',
};

function NavbarController($log, $location, $rootScope, authService) {
  $log.debug('init navbarCtrl');


}
