'use strict'

const URL = `${__API_URL__}/api`
require('../app/service/auth-service')
let token = 'test token'

let testUser = {
  username: 'testUser',
  password: 'testPassword',
  token: 'test token'
}


describe('task-service', function() {
  beforeEach(() => {
    angular.mock.module('wattle')
    angular.mock.inject(( $log, $rootScope, authService, $window, $httpBackend, taskService, categoryService, $q) => {
      this.$window = $window
      this.$rootScope = $rootScope
      this.authService = authService
      this.$httpBackend = $httpBackend
      this.taskService = taskService
      this.$q = $q
      this.categoryService = categoryService
      this.sandbox = sinon.sandbox.create()
      this.$log = $log
    })
    // this.authService.signup(testUser)
    // .then(token => {
    //   $this.log.log('TOKEN HERE?: ', token)
    // })
  })
  afterEach(() => {
    this.sandbox.restore()
  })

  describe('fetch tasks', () => {

    beforeEach(() => {
      let Promise = this.$q
      this.sandbox
      .stub(this.authService, 'getToken')
      .resolves(token)
    })

    it('fetchTasks', () => {
      let url = `${URL}/task`
      console.info(`THIS IS THE CURRENT URL IN TEST: ${url}`)
      let res = {}
      res.data = [
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
        },
        {
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
        }
      ]
      let headers = {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
      this.$httpBackend
        .expectGET(url, headers)
        .respond(200, res)

      this.taskService.fetchTasks()
      this.$httpBackend.flush()
      this.$rootScope.$apply()
    })
  })
})
