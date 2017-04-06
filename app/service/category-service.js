'use strict'

module.exports = ['$q', '$log', '$http', 'authService', 'taskService', categoryService]

function categoryService ($q, $log, $http, authService, taskService) {

  let service = {}

  function uniqueCategory (id, name, priority, category, tasks=[]) {
    this.categoryID = id
    this.categoryName = name
    this.categoryPriority = priority
    this.categoryRef = category
    this.tasks = tasks
  }

  service.categories = []

  service.fetchCategories = function () {
    return taskService
      .fetchTasks()
      .then(tasks => {
        $log.debug('here are the tasks:', tasks)
        $log.debug('processing tasks')
        let uniqueCategories = {}
        tasks.forEach(task => {
          if (!uniqueCategories.hasOwnProperty(task.category._id)) {
            uniqueCategories[task.category._id] = new uniqueCategory(
              task.category._id,
              task.category.name,
              task.category.priority,
              task.category,
              [task]
            )
          } else {
            uniqueCategories[task.category._id].tasks.push(task)
          }

        })

        $log.debug('here are the uniqueCategories:', uniqueCategories)

        let keys = Object.keys(uniqueCategories).forEach( key => {
          service.categories.push(uniqueCategories[key])
        })

        service.categories.sort((a, b) => {
          return a.priority - b.priority
        })

        $log.debug('result equals: ', service.categories)
        return service.categories
      })
  }

  service.createCategory = function (name) {
    $log.debug('new category created with name:', name)
    return authService
      .getToken()
      .then( token => {
        let url = `${__API_URL__}/api/categories`
        let config = {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
        return $http.post(url, {name: name, priority: service.categories.length}, config)
      })
      .then( res => {
        service.categories.push(new uniqueCategory(
          res.data._id,
          res.data.name,
          res.data.priority,
          res.data
        ))
      })
  }

  service.updateCategories = function () {
    service.categories.forEach( category => {
      category.tasks.forEach( task => {
        taskService.updateTask(task)
      })
    })
  }

  return service
}
