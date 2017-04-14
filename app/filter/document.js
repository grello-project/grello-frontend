'use strict'

module.exports = function() {
  return function(tasks, docID){
    if(!docID) return tasks

    return tasks.filter(task => {
      if (task.document === docID) return task
    })
  }
}
