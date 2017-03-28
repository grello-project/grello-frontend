'use strict'

require('./_settings.scss')
//taskService below has not yet been created.
module.exports = {
  template: require('./settings.html'),
  controller: ['$log', '$rootScope', authService, 'taskService', SettingsController],
  controllerAs: 'settingsCtrl'
}

function SettingsController($log, $location, $rootScope, authService) {
  $log.debug('SettingsController')

}
