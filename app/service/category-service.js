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
              task.category
            )
          }

          if (task.author !== 'system') {
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

  service.updateCategory = function (categoryID, title) {
    $log.debug('categoryService.updateCategory()')
    return authService
      .getToken()
      .then( token => {
        let url = `${__API_URL__}/api/categories/${categoryID}`
        let config = {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
        return $http.put(url, {name: title, priority: service.categories.length}, config)
      })
      .then( res => {
        $log.debug('category was updated from service')

  service.deleteCategory = function (id) {

    $log.debug('categoryService.deleteCategory', id)
    return authService
      .getToken()
      .then( token => {
        let url = `${__API_URL__}/api/categories/${id}`
        let config = {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
        return $http.delete(url, config)
      })
      .then(() => {
        $log.log('category deleted from service')

        for(let i = 0; i < service.categories.length; i++) {
          let curr = service.categories[i]
          if(curr.categoryID === id) {
            service.categories.splice(i, 1)
            break
          }
        }

      })
    .catch(err => {
      $log.error(err.message)
      return $q.reject(err)
    })
  }

  return service
}
