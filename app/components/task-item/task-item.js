'use strict'

require('./_task-item.scss')

module.exports = {
  template: './task-item.html',
  controller: taskController,
  controllerAs:'taskCtrl'
}

function taskController () {
  let self = this
}
