'use strict'

const URL = `${__API_URL__}/api`
require('../app/service/category-service')

describe('category-service', function() {
  beforeEach(() => {
    angular.mock.module('wattle')
    angular.mock.inject(( $rootScope, authService, $window, $httpBackend, categoryService) => {
      this.$window = $window
      this.$rootScope = $rootScope
      this.authService = authService
      this.$httpBackend = $httpBackend
      this.categoryService = categoryService
    })
  })

  // describe('service.fetchCategories()', () => {
  //   it('should fetch categories', () => {
  //
  //     let categoryData = {
  //       name: 'testUser',
  //       Authorization: 'Bearer test token'
  //     }
  //
  //     let headers = {
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json',
  //       Authorization: 'Bearer test token'
  //     }
  //
  //     this.$httpBackend.expectGET('http://localhost:3000/api/category', categoryData, headers)
  //     .respond(200, {
  //       name: 'testUser',
  //       Authorization: 'Bearer test token'
  //     })
  //
  //     this.categoryService.fetchCategories(categoryData)
  //     this.$httpBackend.flush()
  //     this.$rootScope.$apply()
  //   })
  // })
})
