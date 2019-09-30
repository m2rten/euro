'use strict'
var UserModel = require ("../../models/users")
var GroupModel = require ("../../models/groups")

function UserController (){
  this.userModel = new UserModel.UserModel()
  this.groupModel = new GroupModel.GroupModel ()
  this.getUsers = function (){
      return this.userModel.getUsers().then(success.bind(this))
    }

   var success = function (rows){
    let userPromises = []
    rows.forEach(row =>{
      userPromises.push(getGroups.apply(this, [row.name]))
    })
    return  Promise.all(userPromises).then( function(values){
      let userArray = {}
      values.forEach(value =>
        Object.assign(userArray, value)
      )
      return userArray
    })
  }

  var getGroups  = function (user){
    var addGroupsToSpecificUser = addGroupsToUser(user)
    return  this.groupModel.getUserGroups(user).then(addGroupsToSpecificUser)
  }

  var addGroupsToUser = function (user){
    return (groups)=>{
      console.log("groups: ", groups)
      let userGroups  = {}
      userGroups[user] = groups
      return userGroups
  }
  }
}
 module.exports ={
   UserController
 }
