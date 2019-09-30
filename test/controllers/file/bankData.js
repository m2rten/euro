require('dotenv').config({path: 'C:\\Users\\marte\\OneDrive\\Documents\\code\\euro\\node\\config\\.env'})
var chai = require("chai");
var sinon = require("sinon");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var expect = chai.expect ;
//var bankDataCtrl = require("../../../controllers/file/bankDataController")
var baseDir = process.cwd()
var bankDataCtrl = require(baseDir+"/controllers/file/bankDataController");

describe("bankData tests", function(){
  it ("runs a basic test if import", function(done){
  console.log(process.cwd())
  done()
  })
})
