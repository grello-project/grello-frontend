'use strict'

const URL = `${__API_URL__}/api`
require('../app/service/auth-service')

describe('auth-service', function() {

  beforeEach(() => {
    angular.mock.module('wattle')
    angular.mock.inject(( $rootScope, authService, $window, $httpBackend) => {
      this.$window = $window
      this.$rootScope = $rootScope
      this.authService = authService
      this.$httpBackend = $httpBackend
    })
  })

  const testUser = {
    username: 'testUser',
    password: 'testPassword'
  }


  describe('authService.login()', () => {
    it('should login a user and should place token in localStorage', () => {

      this.authService.token = null
      this.$window.localStorage.setItem('token', 'test token')

      this.authService.getToken()
      .then( token => {
        expect(token).toEqual('test')
      })
      .catch( err => {
        expect(err).toEqual(null)
      })

      this.$rootScope.$apply()
    })
  })

  describe('authService.getToken()', () => {
    it('should return a token', () => {
      this.authService.token = null
      this.$window.localStorage.setItem('token', 'test')

      this.authService.getToken()
      .then( token => {
        expect(token).toEqual('test')
      })
      .catch( err => {
        expect(err).toEqual(null)
      })

      this.$rootScope.$apply()
    })
  })

  describe('authService.logout()', () => {
    it('should logout the user', () => {
      this.authService.token = null
      this.$window.localStorage.setItem('token', 'test')

      this.authService.getToken()
      .then( token => {
        expect(token).toEqual('test')
      })
      .catch( err => {
        expect(err).toEqual(null)
      })

      this.authService.logout()
      .then( () => {
        expect(this.$window.localStorage.getItem('token')).toEqual(null)
      })
      .catch( err => {
        expect(err).toEqual(null)
      })

      this.$rootScope.$apply()
    })
  })
  describe('authService', () => {
    it('should be a function', () => {
      expect().toEqual()
    })
  })


  // describe('authService.setToken()', () => {
  //   it('should let a token into localStorage')
    //not ready to be tested
  // })

})
