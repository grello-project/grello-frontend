'use strict'

require('./_home.scss')

// module.exports = ['$log', '$rootScope', 'taskService', HomeController]
module.exports = {
  template: require('./home.html'),
  controller: ['$log', '$rootScope', 'authService', 'taskService', HomeController],
  controllerAs: 'homeCtrl'
}

function HomeController($log, $rootScope, taskService) {
  $log.debug('HomeController')

  this.tasks = []

  this.fetchTasks = function() {
    taskService.fetchTasks()
    .then( tasks => {
      this.tasks = tasks
      this.currentTask = tasks[0]
    })
  }

  this.taskDeleteDone = function(task) {
    if (this.currentTask._id === task._id) {
      this.currentTask = null
    }
  }

  this.fetchTasks()

  $rootScope.$on('$locationChangeSuccess', () => {
    this.fetchTasks()
  })
}
