
'use strict'

module.exports = ['$stateProvider', '$urlRouterProvider', routerConfig]

function routerConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when('' , 'join')
  $urlRouterProvider.when('/' , 'join')

  let states = [
    {
      name: 'landing',
      url: '/join',
      template: require('../view/landing/landing.html'),
      controller: 'LandingController',
      controllerAs: 'landingCtrl',
    },
    {
      name: 'tasks',
      url: '/tasks',
      template: require('../view/tasks/tasks.html'),
      controller: 'TasksController',
      controllerAs: 'tasksCtrl',
    },
    {
      name: 'settings',
      url: '/settings',
      template: require('../view/settings/settings.html'),
      controller: 'SettingsController',
      controllerAs: 'settingsCtrl',
    },
  ]

  states.forEach( state => {
    $stateProvider.state(state)
  })
}
