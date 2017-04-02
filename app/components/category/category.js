'use strict'

module.exports = {
  template: './category.html',
  controller: ['$log', 'categoryService', categoryController],
  controllerAs: 'categoryCtrl',
  bindings: {
    category: '<'
  }
}

function categoryController () {
  let self = this
  this.title = 'this is a category'
  this.tasks = []
}
