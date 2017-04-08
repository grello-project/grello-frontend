'use strict'

describe('Task-Item Component', function() {

  beforeEach(() => {
    angular.mock.module('wattle')
    angular.mock.inject(($rootScope, $componentController, $httpBackend) => {
      this.$rootScope = $rootScope
      this.$componentController = $componentController
      this.$httpBackend = $httpBackend
    })
  })

  it('should have the proper bindings', () => {
    let mockBindings = {
      task: {
        googleID: '12345',
        document: 'test doc',
        author: 'test author',
        quote: 'test quote',
        category: {name: 'cat name', tasks: []},
        userID: '54321',
        comment: 'test comment',
        replies: [],
        resolved: false
      }
    }

    let taskItemCtrl = this.$componentController('taskItem', null, mockBindings)
    expect(taskItemCtrl.task).toBeDefined()
    expect(taskItemCtrl.task.googleID).toEqual('12345')
    expect(taskItemCtrl.task.document).toEqual('test doc')
    expect(taskItemCtrl.task.author).toEqual('test author')
    expect(taskItemCtrl.task.quote).toEqual('test quote')
    expect(taskItemCtrl.task.category.name).toEqual('cat name')
    expect(taskItemCtrl.task.userID).toEqual('54321')
    expect(taskItemCtrl.task.comment).toEqual('test comment')
    expect(angular.isArray(taskItemCtrl.task.replies)).toEqual(true)
    expect(taskItemCtrl.task.resolved).toEqual(false)

    this.$rootScope.$apply()
  })

  describe('taskItemCtrl.showInfoToggle', () => {

    it('should call showInfoToggle()', () => {

      let taskItemCtrl = this.$componentController('taskItem', null)

      expect(taskItemCtrl.showInfo).toBe(false)
      taskItemCtrl.showInfoToggle()
      expect(taskItemCtrl.showInfo).toBe(true)
    })
  })
})
