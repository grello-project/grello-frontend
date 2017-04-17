'use strict'

describe('Resolved Filter', function() {
  beforeEach(() => {
    angular.mock.module('wattle')
    angular.mock.inject((resolvedFilter) => {
      this.resolvedFilter = resolvedFilter
    })

    this.tasks = [{comment: 'task 1', document: 1, resolved: true}, {comment: 'task 2', document: 1, resolved: false}, {comment: 'task 3', document: 2, resolved: false}]

  })

  it('should return an array', () => {
    expect(angular.isArray(this.resolvedFilter(this.tasks))).toBe(true)
  })

  it('should leave tasks array unmodified', () => {
    this.resolvedFilter(this.tasks)
    expect(this.tasks).toBe(this.tasks)
  })

  it('should return non-resovled tasks', () => {
    const filteredTasks = this.resolvedFilter(this.tasks)
    expect(filteredTasks.length).toBe(2)
    filteredTasks.forEach(task => {
      expect(task.resolved).toBe(false)
    })
  })
})
