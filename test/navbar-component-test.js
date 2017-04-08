'use strict'

describe('Navbar Componenet', function() {

  beforeEach(() => {
    angular.mock.module('wattle')
    angular.mock.inject(($rootScope, $componentController, $httpBackend, authService, profileService) =>{
      this.$rootScope = $rootScope
      this.$componentController = $componentController
      this.$httpBackend = $httpBackend
      this.authService = authService
      this.profileService = profileService
    })
  })

  describe('NavbarController.logout()', () => {

    it('should call logout()', () => {
    })
  })
})
