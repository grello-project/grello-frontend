'use strict'

module.exports = ['$q', '$log', '$http', 'authService', 'taskService', categoryService]

function categoryService ($q, $log, $http, authService, taskService) {

  let service = {}

  service.categories = []

  service.getCategories = function () {
    taskService
      .fetchTasks()
      .then(tasks => {
        tasks.forEach(task => {
          
        })
      })
  }
}
