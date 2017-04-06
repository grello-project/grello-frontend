'use strict'

module.exports = ['$q', '$log', '$http', 'authService', profileService]

function profileService($q, $log, $http, authService) {
  $log.debug('profileService()')

  let service = {}

  service.getUser = function() {
    $log.debug('profileService.getUser()')

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/users`
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      return $http.get(url, config)
    })
    .then( res => {
      $log.log('user retrieved')
      service.user = res.data
      return service.user
    })
    .catch( err => {
      $log.error(err.message)
      return $q.reject(err)
    })
  }

}
