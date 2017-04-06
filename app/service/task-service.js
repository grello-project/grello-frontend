'use strict'

let testResponse = {}
testResponse.data = [
  {
    _id: 1,
    comment: 'task1',
    priority: 1,
    category: {
      _id: '000',
      name: 'uncategorized',
      priority: 1
    },
    document: {
      _id: 1,
      name: 'document1'
    },
    user: '123'
  },{
    _id: 2,
    comment: 'task2',
    priority: 2,
    category: {
      _id: '000',
      name: 'uncategorized',
      priority: 1
    },
    document: {
      _id: 1,
      name: 'document1'
    },
    user: '123'
  },{
    _id: 3,
    comment: 'task3',
    priority: 3,
    category: {
      _id: '001',
      name: 'P0',
      priority: 2
    },
    document: {
      _id: 1,
      name: 'document1'
    },
    user: '123'
  },{
    _id: 4,
    comment: 'task4',
    priority: 4,
    category: {
      _id: '001',
      name: 'P0',
      priority: 2
    },
    document: {
      _id: 1,
      name: 'document1'
    },
    user: '123'
  }
]

module.exports = ['$q', '$log', '$http', 'authService', taskService]

function taskService($q, $log, $http, authService) {
  $log.debug('taskService()')

  let service = {}

  service.tasks = []

  service.fetchTasks = function() {
    $log.debug('taskService.createTasks()')

    return authService.getToken()
    .then( token => {

      let url = `${__API_URL__}/api/tasks`

      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      return $q.resolve(testResponse)
      // return $http.get(url, config)
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
      let url = `${__API_URL__}/api/task/${task._id}`
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

  return service
}
