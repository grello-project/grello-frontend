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
  self.showNewCategoryForm = false
  self.newCategoryName = null
  self.showSettings = false

  self.$onInit = function () {
    $log.debug('this is the category:', self.category)
    self.title = self.category.categoryName
    self.tasks_clone = angular.copy(self.category.tasks)
  }

  self.$doCheck = function () {
    if (!angular.equals(self.tasks_clone, self.category.tasks)) {
      $log.debug(`doCheck called on ${self.category.categoryName}`)
      updateTasks()
      self.tasks_clone = angular.copy(self.category.tasks)
    }
  }

  self.createNewCategory = function () {
    categoryService
      .createCategory(self.newCategoryName)
      .then(() => {
        $log.debug('resolved')
      })
    self.showNewCategoryForm = false
  }

  self.updateCategory = function () {
    $log.debug('$categoryCtrl.updateCategory', self.category)
    categoryService
      .updateCategory(self.category.categoryID, self.title)
      .then(() => {
        $log.debug('category updated from ctrl')
        self.showSettings = false
      })
  }

  self.deleteCategory = function () {
    $log.debug('$categoryCtrl.deleteCategory()')
    categoryService
      .deleteCategory(self.category.categoryID)
      .then(() => {
        $log.debug('category deleted from ctrl')
      })
  }

  function updateTasks () {
    self.category.tasks.forEach( (task, index) => {
      task.priority = index
      task.category = self.category.categoryRef
      taskService.updateTask(task)
    })
  }

}
