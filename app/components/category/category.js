'use strict'

require('./_category.scss')

module.exports = {
  template: require('./category.html'),
  controller: ['$log', '$scope', 'categoryService', categoryController],
  controllerAs: 'categoryCtrl',
  bindings: {
    category: '<'
  }
}

function categoryController ($log, $scope, categoryService) {
  let self = this

  self.$onInit = function () {
    $log.debug('this is the category:', self.category)
    self.title = self.category.categoryName
  }

  self.changeEvent = (task) => {
    $log.debug(`this task changed: ${task}`)
  }

}
