'use strict'

require('./_tasks.scss')

module.exports = [
  '$location',
  '$log',
  'authService',
  'taskService',
  TaskController
]

function TaskController ($location, $log, authService, taskService) {
  const self = this
  self.categories = []

  authService
    .getToken()
    .then( token => {
      $location.url('/tasks')
    })
    .catch( err => {
      $log.debug(err)
      $location.url('/')
    })
}
