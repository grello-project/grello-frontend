'use strict'

module.exports = ['$q', '$log', '$http', 'authService', documentService]

function documentService($q, $log, $http, authService) {
  $log.debug('documentService()')

  let service = []

  service.fetchDocuments = function() {
    $log.debug('documentService.fetchDocuments()')

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/documents`
      let config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      return $http.get(url, config)
    })
    .then( res => {
      $log.log('documents retrieved')
      service.documents = res.data
      $log.log('documents from server', res.data)
      return service.documents
    })
    .catch( err => {
      $log.error(err.message)
      return $q.reject(err)
    })
  }

  return service
}
