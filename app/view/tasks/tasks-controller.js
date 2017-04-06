'use strict'

require('./_tasks.scss')

module.exports = [
  '$location',
  '$scope',
  '$log',
  'authService',
  'categoryService',
  TasksController
]

function TasksController ($location, $scope, $log, authService, categoryService) {
  const self = this
  self.models = {
    selected: null,
    categories: []
  }

  authService
    .getToken()
    .then( token => {
      $location.url('/tasks')
      categoryService
        .fetchCategories()
        .then( categories => {
          $log.debug('self.categories assigned to categories')
          self.models.categories = categories
        })
    })
    .catch( err => {
      $log.debug(err)
      $location.url('/')
    })

  $scope.$watch('self.categories.tasks', () => {
    $log.debug('hey the categories have changed')
  })
}
