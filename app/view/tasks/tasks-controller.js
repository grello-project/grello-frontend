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
          self.models.categories = categories
          self.models.categories.push(new newCategory(self.models.categories.length))
        })
    })
    .catch( err => {
      $log.debug(err)
      $location.url('/')
    })

}
