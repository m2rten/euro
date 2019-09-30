'use strict'
var groups = require ('../../models/groups')


var getUserGroups = function(user){
return groups.getGroups(user).then(function(groups){
  return groups
})
}


module.exports = {
  getUserGroups
}
