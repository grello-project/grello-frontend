'use strict'

require('./_category.scss')

module.exports = {
  template: require('./category.html'),
  controller: ['$log', 'categoryService', categoryController],
  controllerAs: 'categoryCtrl',
  bindings: {
    category: '<'
  }
}

function categoryController () {
  let self = this
  this.tasks = []

  self.$onInit = function () {
    this.title = this.category.name
  }

}
