'use strict'

module.exports = ['$q', '$log', '$http', 'authService', taskService]

function taskService($q, $log, $http, authService) {
  $log.debug('taskService()')

  let service = {}

  service.task = []

  service.createTask = function(task) {
    $log.debug('taskService.createTask()')

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/task`
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }

      return $http.post(url, task, config)
    })
    .then( res => {
      $log.log('task created')
      let task = res.data
      service.task.unshift(task)
      return task
    })
    .catch( err => {
      $log.error(err.message)
      return $q.reject(err)
    })
  }


  service.fetchTasks = function() {
    $log.debug('taskService.createTasks()')

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/task`
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      return $http.get(url, config)
    })
    .then( res => {
      $log.log('task retrieved')
      service.task = res.data
      return service.task
    })
    .catch( err => {
      $log.error(err.message)
      return $q.reject(err)
    })
  }

  service.updateTask = function(taskID, taskData) {
    $log.debug('taskService.updateTask()')
    $log.debug(typeof taskID)

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/task/${taskID}`
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }

      return $http.put(url, taskData, config)
    })
    .then( res => {
      for (let i = 0; i < service.task.length; i++) {
        let current = service.task[i]
        if (current._id === taskID) {
          service.task[i] = res.data
          break
        }
      }

      return res.data
    })
    .catch( err => {
      $log.error(err.message)
      return $q.reject(err)
    })
  }

  service.deleteTask = function(taskID) {
    $log.debug('taskService.updateTask()')

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/task/${taskID}`
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      return $http.delete(url, config)
    })
    .then( res => {
      for (let i = 0; i < service.task.length; i++) {
        let current = service.task[i]
        if (current._id === taskID) {
          service.task.splice(i, 1)
          break
        }
      }
    })
    .catch( err => {
      $log.error(err.message)
      return $q.reject(err)
    })
  }

  return service
}