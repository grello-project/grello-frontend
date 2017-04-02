'use strict'

module.exports = ['$q', '$log', '$http', 'authService', 'taskService', categoryService]

function categoryService ($q, $log, $http, authService, taskService) {

  let service = {}

  service.categories = []

  service.getCategories = function () {
    taskService
      .fetchTasks()
      .then(tasks => {
        let uniqueCategories = {}
        tasks.forEach(task => {
          if (!uniqueCategories.hasOwnProperty(task.category._id)) {
            task.category.tasks = [task]
            uniqueCategories[task.category._id] = task.category
          } else {
            uniqueCategories[task.category._id].tasks.push(task)
          }
        })
        uniqueCategories.keys().forEach( key => {
          service.categories.push(uniqueCategories[key])
        })
        service.categories.sort((a, b) => {
          return a.priority - b.priority
        })
      })
  }
}
