'use strict'

require('./_tasks.scss')

module.exports = [
  '$location',
  '$scope',
  '$log',
  'authService',
  'taskService',
  'categoryService',
  'documentService',
  TasksController
]

function TasksController ($location, $scope, $log, authService, taskService, categoryService, documentService) {
  const self = this
  // self.models = {
  //   selected: null,
  //   categories: []
  // }
  self.categories = null
  self.documents = []
  // this is a special placeholder category for creating new categories
  let newCategory = function (i) {
    this.categoryID = 'newCat'
    this.categoryName = ''
    this.categoryPriority = i
    this.categoryRef = null
    this.tasks = []
  }
  let updateCategories = $scope.$on('refresh categories', () => {
    $log.debug('refreshing categories')
    return self.refresh()
  })

  authService
    .getToken()
    .then( token => {
      $location.url('/tasks')
      categoryService
        .fetchCategories()
        .then( categories => {
          // $log.debug('self.categories assigned to categories')
          self.categories = categories
        })
    })
    .catch( err => {
      $log.debug(err)
      $location.url('/')
    })

  self.fetchDocuments = function() {
    // $log.debug('tasksCtrl.fetchDocuments()')
    documentService
      .fetchDocuments()
      .then(documents => {
        // $log.debug('tasksCtrl has fetched documents')
        self.documents = documents
        // $log.log('self.documents', self.documents)
      })
  }

  self.refresh = function () {
    taskService
      .refresh()
      .then( () => {
        return categoryService
          .fetchCategories()
          .then( categories => {
            // $log.debug('self.categories assigned to categories')
            self.categories = categories
            // $log.debug(self.categories)
          })
      })
      .catch( err => {
        $log.error(err)
      })
  }

  self.fetchDocuments()

}
