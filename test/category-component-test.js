'use strict'

describe('Category Componenet', function() {

  beforeEach(() => {
    angular.mock.module('wattle')
    angular.mock.inject(($rootScope, $componentController, $httpBackend, $window, taskService, categoryService, authService) => {
      this.$rootScope = $rootScope
      this.$componentController = $componentController
      this.$httpBackend = $httpBackend
      this.$window = $window
      this.taskService = taskService
      this.categoryService = categoryService
      this.authService = authService
    })

    this.$window.localStorage.setItem('token', 'test token')
  })

  it('should have proper bindings', () => {
    let mockBindings = {
      category: {
        name: 'test category',
        id: '12345',
        tasks: ['task1', 'task2']
      }
    }

    let categoryCtrl = this.$componentController('category', null, mockBindings)
    expect(categoryCtrl.category).toBeDefined()
    expect(categoryCtrl.category.name).toEqual(mockBindings.category.name)
    expect(categoryCtrl.category.id).toEqual(mockBindings.category.id)
    expect(angular.isArray(categoryCtrl.category.tasks)).toEqual(true)
    expect(categoryCtrl.category.tasks[0]).toEqual('task1')

    this.$rootScope.$apply()
  })

  describe('categoryController.createNewCategory()', () => {
    it('should call categoryController.createNewCategory()', () => {
      let mockBindings = {
        category: {
          name: 'new category'
        },
        createNewCategory: function(data) {
          expect(data.categoryData.name).toEqual('new category')
        }
      }

      let categoryCtrl = this.$componentController('category', null, mockBindings)
      categoryCtrl.createNewCategory({categoryData: categoryCtrl.category})

      this.$rootScope.$apply()
    })

    it('should POST a new category', () => {
      let url = 'http://localhost:3000/api/categories'
      let headers = {
        Accept: 'application/json',
        Authorization: 'Bearer test token',
        'Content-Type': 'application/json'
      }

      let categoryData = {
        name: null,
        priority: 0
      }

      this.$httpBackend.expectPOST(url, categoryData, headers).respond(200)

      let mockBindings = {
        category: {
          name: 'new cat'
        }
      }

      let categoryCtrl = this.$componentController('category', null, mockBindings)
      categoryCtrl.createNewCategory()

      this.$httpBackend.flush()
      this.$rootScope.$apply()
    })
  })
})
