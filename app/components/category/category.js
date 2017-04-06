'use strict'

require('./_category.scss')

module.exports = {
  template: require('./category.html'),
  controller: ['$log', '$scope', 'taskService', 'categoryService', categoryController],
  controllerAs: 'categoryCtrl',
  bindings: {
    category: '<'
  }
}

function categoryController ($log, $scope, taskService, categoryService) {
  let self = this

  self.$onInit = function () {
    $log.debug('this is the category:', self.category)
    self.title = self.category.categoryName
  }

  self.$doCheck = function () {
    if (!angular.equals(self.tasks_clone, self.category.tasks)) {
      $log.debug(`doCheck called on ${self.category.categoryName}`)
      updateTasks()
      self.tasks_clone = angular.copy(self.category.tasks)
    }
  }

  function updateTasks () {
    self.category.tasks.forEach( (task, index) => {
      task.priority = index
      task.category = self.category.categoryRef
    })
  }

}
