'use strict'

require('./_task-item.scss')

module.exports = {
  template: require('./task-item.html'),
  controller: ['$log', '$scope', 'taskService', taskController],
  controllerAs:'taskCtrl',
  bindings: {
    task: '<',
    docfilter: '<'
  }
}

function taskController ($log, $scope, taskService) {
  // $log.log('THIS IS DOCFILTER FROM TASK ITEM CTRL', this.docfilter)
  let self = this

  self.showInfo = false

  self.showInfoToggle = function () {
    return self.showInfo = !self.showInfo
  }

  self.resolveTask = function() {
    $log.log('RESOLVING TASK')
    taskService
      .resolveTask(self.task._id)
      .then(() => {
        $scope.$emit('refresh categories')
      })
      .catch(err => {
        $log.debug(err)
      })
  }

}
