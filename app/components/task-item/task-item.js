'use strict'

require('./_task-item.scss')

module.exports = {
  template: './task-item.html',
  controller: ['$log', taskController],
  controllerAs:'taskCtrl',
  bindings: {
    task: '<'
  }
}

function taskController () {
  let self = this
}
