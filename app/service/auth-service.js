'use strict'

module.exports = ['$q', '$log', '$location', '$http', '$window', authService]

function authService($q, $log, $location, $http, $window){
  $log.debug('authService')

  let service = {}

  let token = null

  service.setToken = function(_token){

    $log.debug('authService.setToken()')

    if (! _token) {
      return $q.reject(new Error('no token'))
    }

    $window.localStorage.setItem('token', _token)
    token = _token
    return $q.resolve(token)
  }

  service.getToken = function(){
    $log.debug('authService.getToken()')
    if (token) {
      return $q.resolve(token)
    }

    token = $window.localStorage.getItem('token')
    if (token) return $q.resolve(token)

    return $q.reject(new Error('token not found'))
  }

  service.logout = function(){
    $log.debug('authService.logout()')

    $window.localStorage.removeItem('token')
    token = null
    return $q.resolve()
  }

  service.getGoogleRedirectURL = function(){
    $log.debug('authService.getGoogleRedirectURL()')
    let url = `${__API_URL__}/gapi/auth`
    return $http.get(url)
  }

  return service
}
