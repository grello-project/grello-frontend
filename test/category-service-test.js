'use strict'

const URL = `${__API_URL__}/api`
require('../app/service/category-service')

describe('category-service', function() {
  beforeEach(() => {
    angular.mock.module('wattle')
    angular.mock.inject(( $rootScope, authService, $window, $httpBackend) => {
      this.$window = $window
      this.$rootScope = $rootScope
      this.authService = authService
      this.$httpBackend = $httpBackend
    })
  })


})
