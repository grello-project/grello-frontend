'use strict'

require('./_settings.scss')

module.exports = {
  template: require('./settings.html'),
  controller: ['$log', '$rootScope', 'authService', 'taskService', SettingsController],
  controllerAs: 'settingsCtrl'
}

function SettingsController($log, $location, $rootScope, authService) {
  $log.debug('SettingsController')

}
