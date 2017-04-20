'use strict'

require('./_task-item.scss')

module.exports = {
  template: require('./task-item.html'),
  controller: ['$log', taskController],
  controllerAs:'taskCtrl',
  bindings: {
    task: '<',
    docfilter: '<'
  }
}

function taskController ($log) {
  $log.log('THIS IS DOCFILTER FROM TASK ITEM CTRL', this.docfilter)
  let self = this

  self.showInfo = false

  self.showInfoToggle = function () {
    return self.showInfo = !self.showInfo
  }


}
