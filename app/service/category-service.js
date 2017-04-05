'use strict'

module.exports = ['$q', '$log', '$http', 'authService', 'taskService', categoryService]

function categoryService ($q, $log, $http, authService, taskService) {

  let service = {}

  service.categories = []

  service.fetchCategories = function () {
    return taskService
      .fetchTasks()
      .then(tasks => {
        $log.debug('here are the tasks:', tasks)
        $log.debug('processing tasks')
        // let uniqueCategories = {}
        tasks.forEach(task => {
        //   if (!uniqueCategories.hasOwnProperty(task.category._id)) {
        //     task.category.tasks = [task]
        //     uniqueCategories[task.category._id] = task.category
        //   } else {
        //     uniqueCategories[task.category._id].tasks.push(task)
        //   }
        })


        return service.categories
      })
  }

  return service
}
