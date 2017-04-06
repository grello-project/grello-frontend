
'use strict'

const URL = `${__API_URL__}/api`
require('../app/service/auth-service')

let testUser = {
  username: 'testUser',
  password: 'testPassword',
  token: 'test token'
}


describe('task-service', function() {
  beforeEach(() => {
    angular.mock.module('wattle')
    angular.mock.inject(( $rootScope, authService, $window, $httpBackend, taskService, categoryService, $q) => {
      this.$window = $window
      this.$rootScope = $rootScope
      this.authService = authService
      this.$httpBackend = $httpBackend
      this.taskService = taskService
      this.$q = $q
      this.categoryService = categoryService
      this.sandbox = sinon.sandbox.create()
    })
  })
  afterEach(() => {
    this.sandbox.restore()
  })

  it('fetchTasks', () => {
    let token = 'test token'
    beforeEach(() => {
      let Promise = this.$q
      this.sandbox
        .stub(this.authService, 'getToken')
        .resolves(token)
    })

    let headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }

    let testCategoryData =   [
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

    this.$httpBackend
      .expectGET(`${URL}/task`, headers)
      .respond(200,
      [
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
        }
      ]
    )
    this.categoryService.fetchCategories(testCategoryData)
    this.$httpBackend.flush()
    this.$rootScope.$apply()

  })

  // expect(typeof )

})

