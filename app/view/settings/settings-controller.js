'use strict'

require('./_settings.scss')

module.exports = ['$location', '$scope', '$log', 'authService', 'taskService', 'categoryService', 'documentService', 'profileService', SettingsController]

function SettingsController ($location, $scope, $log, authService, taskService, categoryService, documentService, profileService) {
  this.tasks
  this.docs

  authService.getToken()
  .then( token => {
    taskService.fetchTasks()
    .then( tasks => {
      this.tasks = tasks
      $log.debug('this.tasks assigned to tasks AGAIN', this.tasks)
    })
  })
  .catch( err => {
    $log.debug(err)
    $location.url('/')
  })

  profileService.getUser()
  .then(user => {
    this.user = user
    this.user.profilePic = this.user.profilePic.slice(0, -6)
    $log.log('THIS IS THE USER FROM SETTINGS VIEW', this.user)
  })
  .catch(err => $log.error(err))

  documentService.fetchDocuments()
  .then(docs => {
    this.docs = docs
  })
  .catch(err => $log.error(err))

  this.deleteProfile = function() {
    $log.debug('settingsCtrl.deleteProfile()')
    profileService.deleteProfile()
    .then(() =>{
      authService.logout()
    })
    .then(() => {
      $location.url('/join')
    })
  }
}
