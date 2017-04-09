module.exports = function() {
  return function(tasks) {
    return tasks.filter(task => {
      if (!task.resolved) return task
    })
  }
}
