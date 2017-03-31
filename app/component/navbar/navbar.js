

require('./_navbar.scss');

module.exports = {
  template: require('./navbar.html'),
  controller: ['$log', '$location', '$rootScope', NavbarController],
  controllerAs: 'navbarCtrl',
  bindings: {
    user: '='
  }
};

function NavbarController($log, $location, $rootScope){
  $log.debug('NavbarController');

}
