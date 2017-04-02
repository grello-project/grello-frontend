'use strict'

require('./_tasks.scss')

module.exports = [
  '$location',
  '$log',
  'authService',
  'categoryService',
  TasksController
]

function TasksController ($location, $log, authService, categoryService) {
  const self = this
  self.categories = []

  authService
    .getToken()
    .then( token => {
      $location.url('/tasks')
      categoryService
        .fetchCategories()
        .then( categories => {
          self.categories = categories
        })
    })
    .catch( err => {
      $log.debug(err)
      $location.url('/')
    })
}
