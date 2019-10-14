var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var expect = chai.expect

var users = require ('../models/users')
var groups = require ('../models/groups')
var userCtrl = require ('../controllers/user/userController')
var assert = require ('assert')

describe("trying stuff out", function (){


  it ("tests real user function from a Promise", function (done){
  userList =  users.getUsers()
  userList.then( function(rows) {
     assert.equal(rows[0].name,"marten")
     done()
   }
   )
   .catch(function(err){
     done(err)
   }
 )
  })
  it ("Test User promise with Chai",function (){
    return users.getUsers().then(function(rows){
      expect(rows[0].name).to.equal('marten')
      expect(rows[0].pwd).to.equal(null)
    }

    )
  })
  it ("Test User promise with Chai second time",function (){
    return users.getUsers().then(function(rows){
      expect(rows[0].name).to.equal('marten')
      expect(rows[0].pwd).to.equal(null)
    })
  })


  it ("Tests groups model for returning  correct groups", function (){
    var promise  = groups.getGroups('marten')
    return promise.then(function (returnedGroups){
    expect(returnedGroups).to.be.an("Array").that.has.members(["admin","viewer"])
    })
  })



  it ("Tests if user has correct groups", function (){
    var promise  = groupCtrl.getUserGroups('marten')
    return promise.then(function (userGroups){
      console.log("userGroups: ", userGroups)
    expect(userGroups).to.be.an("Array").that.has.members(["admin","viewer"])
    })
  })

    it("TestsUsersAndGroups", function (){
      return userCtrl.getUsers().then(function(users){
      expect(users).to.be.an("Object").that.includes.all.keys( ['marten'])
      expect(users).to.be.an("Object").that.includes.all.keys( ['suvaline'])
      expect(users.marten).to.be.an("Array").that.includes.members(["admin","viewer"])
      expect(users.suvaline).to.be.an("Array").that.includes.members(["worker","viewer"])
    })
    })

    it ("Tests if user has correct groups", function (){
      var promise  = groupCtrl.getUserGroups('marten')
      return promise.then(function (userGroups){
        console.log("userGroups: ", userGroups)
      expect(userGroups).to.be.an("Array").that.has.members(["admin","viewer"])
      })
    })
})
