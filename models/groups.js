'use strict';
var db = require ('./database/db')

function GroupModel (){
    this.getUserGroups = function (username){
    var groupPromise = db.getAsync( `select user_group from user_groups where user ="${username}"`);

    return groupPromise.then(function(groupDict){
      var groups = []
       groupDict.forEach(item =>
         groups.push(item.user_group)
       )
       return groups
    })
  }
  var errorHandler = function (err){
    console.log(err)
    throw new Error ("Could not read DB")
  }
}

module.exports ={
  GroupModel
}
