'use strict'

describe('Document Filter', function() {
  beforeEach(() => {
    angular.mock.module('wattle')
    angular.mock.inject((documentFilter) => {
      this.documentFilter = documentFilter
    })

    this.tasks = [{comment: 'task 1', document: 1}, {comment: 'task 2', document: 1}, {comment: 'task 3', document: 2}]

  })

  it('should return an array', () => {
    expect(angular.isArray(this.documentFilter(this.tasks))).toBe(true)
  })

  it('should leave tasks array unmodified', () => {
    expect(this.documentFilter(this.tasks)).toBe(this.tasks)
    expect(this.tasks).toBe(this.tasks)
  })

  it('should return all tasks when docID is undefined', () => {
    expect(this.documentFilter(this.tasks)).toBe(this.tasks)
  })

  it('should return tasks for document 1', () => {
    const filteredTasks = this.documentFilter(this.tasks, 1)
    expect(filteredTasks.length).toBe(2)
    filteredTasks.forEach(task => {
      expect(task.document).toBe(1)
    })
  })

  it('should return empty array when document has no tasks', () => {
    const filteredTasks = this.documentFilter(this.tasks, 3)
    expect(filteredTasks.length).toBe(0)
  })
})
