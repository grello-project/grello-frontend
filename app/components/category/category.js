'use strict'

require('./_category.scss')

module.exports = {
  template: require('./category.html'),
  controller: ['$log', '$scope', 'taskService', 'categoryService', categoryController],
  controllerAs: 'categoryCtrl',
  bindings: {
    category: '<',
    docfilter: '<'
  }
}

function categoryController ($log, $scope, taskService, categoryService) {
  let self = this
  self.showNewCategoryForm = false
  self.newCategoryName = null
  self.editCategoryTitle = null
  self.showSettings = false

  self.$onInit = function () {
    // $log.debug('this is the category:', self.category)
    self.title = self.category.categoryName
    self.editCategoryTitle = self.title
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
    self.newCategoryName = null
  }

  self.updateCategory = function () {
    // $log.debug('$categoryCtrl.updateCategory', self.category)
    self.title = self.editCategoryTitle
    categoryService
      .updateCategory(self.category.categoryID, self.editCategoryTitle)
      .then(() => {
        // $log.debug('category updated from ctrl')
        self.showSettings = false
      })
  }

  self.cancelEdit = function () {
    self.editCategoryTitle = self.title
    self.showSettings = false
  }

  self.deleteCategory = function () {
    // $log.debug('$categoryCtrl.deleteCategory()')
    categoryService
      .deleteCategory(self.category.categoryID)
      .then(() => {
        $log.debug('category deleted from ctrl')
        self.showSettings = false
        $scope.$emit('refresh categories')
      })
  }

  self.cancelNewCategoryForm  = function () {
    self.showNewCategoryForm = false
    self.newCategoryName = null
  }

  function updateTasks () {
    $log.debug(self.category.tasks)
    self.category.tasks.forEach( (task, index) => {
      task.priority = index
      task.category = self.category.categoryRef
      taskService.updateTask(task)
    })
  }

  self.removeItem = function (taskToDelete) {
    $log.log('remove task', taskToDelete)
    self.category.tasks = self.category.tasks.filter(function (task) {
      return task._id !== this._id
    }, taskToDelete)

    $log.debug('updated category tasks:', self.category.tasks)

    $scope.$emit('refresh categories')

    return self.category.tasks
    // let indexToRemove = self.category.tasks.findIndex((elt) => {
    //   return elt._id === this._id
    // }, task)
    // return self.category.tasks.splice(indexToRemove, 1)
  }

}
