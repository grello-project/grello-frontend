'use strict'

module.exports = function() {
  return function(tasks, docID){
    console.log('RUNNING DOC FILTER', docID)
    if(!docID) return tasks

    return tasks.filter(task => {
      console.log('DO WE GET HERE')
      if (task.document === docID) return task
    })
  }
}
