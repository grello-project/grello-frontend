'use strict'

module.exports = ['$q', '$log', '$http', 'authService', taskService]

function taskService($q, $log, $http, authService) {
  $log.debug('taskService()')

  let service = {}

  service.tasks = []

  service.fetchTasks = function() {
    $log.debug('taskService.fetchTasks()')

    return authService.getToken()
    .then( token => {

      let url = `${__API_URL__}/api/tasks`

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
      service.tasks = res.data
      return $q.resolve(service.tasks)
    })
    .catch( err => {
      $log.error(err.message)
      return $q.reject(err)
    })
  }

  service.updateTask = function(task) {
    $log.debug('taskService.updateTask()')
    $log.debug(typeof task._id)

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/tasks/${task._id}`
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
      return $http.put(url, task, config)
    })
    .then( res => {
      for (let i = 0; i < service.tasks.length; i++) {
        let current = service.tasks[i]
        if (current._id === task._id) {
          service.tasks[i] = res.data
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

  service.resolveTask = function(task) {
    $log.debug('taskService.updateTask()')

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/task/${task._id}`
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      return $http.put(url, config)
    })
    .then( res => {
      for (let i = 0; i < service.tasks.length; i++) {
        let current = service.tasks[i]
        if (current._id === task._id) {
          service.tasks.splice(i, 1)
          break
        }
      }
    })
    .catch( err => {
      $log.error(err.message)
      return $q.reject(err)
    })
  }

  service.refresh = function() {
    $log.debug('refresh')

    return authService
      .getToken()
      .then( token => {
        let url = `${__API_URL__}/api/google/tasks`
        let config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

        return $http.put(url,{},config)
      })
      .catch( err => {
        $log.error(err.message)
        return $q.reject(err)
      })

  }

  return service
}
