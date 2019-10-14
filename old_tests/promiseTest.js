require('dotenv').config({path: 'C:\\Users\\marte\\OneDrive\\Documents\\code\\euro\\node\\config\\.env'})
var chai = require("chai");
var sinon = require("sinon");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var expect = chai.expect ;
var FS =  require('../trial/fooService')
var users = require ('../models/users')
var groups = require ('../models/groups')
var UserCtrl = require ('../controllers/user/userController')
var assert = require ('assert')

describe("trying stuff out", function (){

/*  it ("Tests without stubs", function (){
      var fs = new FS.FooService();
      expect(fs.getFoo()).to.equal(1)
    })
*/

    it("TestsUsersAndGroups wo Stub", function (){
      var userCtrl = new UserCtrl.UserController()

      return userCtrl.getUsers().then(function(users){
      expect(users).to.be.an("Object").that.includes.all.keys( ['marten'])
      expect(users).to.be.an("Object").that.includes.all.keys( ['suvaline'])
      expect(users.marten).to.be.an("Array").that.includes.members(["admin","viewer"])
      expect(users.suvaline).to.be.an("Array").that.includes.members(["worker","viewer"])
    })
    })

    it("TestsUsersAndGroups with Stub", function (){
      var userCtrl = new UserCtrl.UserController()

      sinon.stub(userCtrl.userModel, "getUsers")
        .resolves([{name:"marten"},{name:"suvaline"}])

     var stub = sinon.stub(userCtrl.groupModel, "getUserGroups")
     stub.withArgs("marten").returns(Promise.resolve(["admin","viewer"]))
     stub.withArgs("suvaline").returns(Promise.resolve(["worker","viewer"]))

      return userCtrl.getUsers().then(function(users){
      expect(users).to.be.an("Object").that.includes.all.keys( ['marten'])
      expect(users).to.be.an("Object").that.includes.all.keys( ['suvaline'])
      expect(users.marten).to.be.an("Array").that.includes.members(["admin","viewer"])
      expect(users.suvaline).to.be.an("Array").that.includes.members(["worker","viewer"])
    })
    })

  it ("Tests if user has correct groups", function (){

    const recordInDb = ["admin","viewer"];
    var fs = new FS.FooService();
    sinon.stub(fs.db, 'getDb')
        .returns(1)
  //    .returns(Promise.resolve([recordInDb]));

    expect(fs.getFoo()).to.equal(1)
    })


})
