'use strict'

require('./_home.scss')
//taskService below has not yet been created.
module.exports = {
  template: require('./_home.html'),
  controller: ['$log', '$rootScope', 'taskService', HomeController],
  controllerAs: 'homeCtrl',
}
//taskService below has not yet been created.
function HomeController($log, $rootScope, taskService) {
  $log.debug('HomeController')

}
