'use strict'

require('./_tasks.scss')

module.exports = [
  '$location',
  '$scope',
  '$log',
  'authService',
  'taskService',
  'categoryService',
  TasksController
]

function TasksController ($location, $scope, $log, authService, taskService, categoryService) {
  const self = this
  // self.models = {
  //   selected: null,
  //   categories: []
  // }
  self.categories = null
  // this is a special placeholder category for creating new categories
  let newCategory = function (i) {
    this.categoryID = 'newCat'
    this.categoryName = ''
    this.categoryPriority = i
    this.categoryRef = null
    this.tasks = []
  }

  authService
    .getToken()
    .then( token => {
      $location.url('/tasks')
      categoryService
        .fetchCategories()
        .then( categories => {
          $log.debug('self.categories assigned to categories')
          self.categories = categories
        })
    })
    .catch( err => {
      $log.debug(err)
      $location.url('/')
    })

  self.refresh = function () {
    taskService
      .refresh()
      .then( () => {
        return categoryService
          .fetchCategories()
          .then( categories => {
            $log.debug('self.categories assigned to categories')
            self.categories = categories
            $log.debug(self.categories)
          })
      })
      .catch( err => {
        $log.error(err)
      })
  }

}
