'use strict'

require('./_task-item.scss')

module.exports = {
  template: require('./task-item.html'),
  controller: ['$log', taskController],
  controllerAs:'taskCtrl',
  bindings: {
    task: '<'
  }
}

function taskController () {
  let self = this

  self.showInfo = false

  self.showInfoToggle = function () {
    return self.showInfo = !self.showInfo
  }

}
