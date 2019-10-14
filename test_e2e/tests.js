require('dotenv').config({path: 'C:\\Users\\marte\\OneDrive\\Documents\\code\\euro\\node\\config\\.e2e_test_env'})
var chai = require("chai");
var sinon = require("sinon");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var expect = chai.expect ;
//var bankDataCtrl = require("../../../controllers/file/bankDataController")
var baseDir = process.cwd()
var { BankDataController } = require(baseDir+"/controllers/file/bankDataController");
var testDataFolder = "C:\\Users\\marte\\OneDrive\\Documents\\code\\euro\\node\\test\\controllers\\file\\test_data\\"

//duplicate data
//incorrect data type
//missing cell

describe("e2e tests tests", function(){
  var getFileName;
  var bankData ;
  var parse;
  var readCsvFromReq;

  beforeEach(function(){
    bankData = new BankDataController()
    getFileName = sinon.stub(bankData, "getFileName");
    parse = sinon.stub(bankData.form, "parse");
    readCsvFromReq = sinon.stub(bankData, "readCsvFromReq");
    readCsvFromReq.resolves()
    parse.returns(true)
  })

  afterEach(function(){
    sinon.restore()
  })

  xit("is hello world type of test ", function(){
    expect(1).to.equal(1)
  })
  it("Tests that we inserting data correty ", function(){
   getFileName.returns(testDataFolder + "small.csv")
   return bankData.handleCsv().then((result)=>{
      expect(result.rows).to.equal(1)
      expect(result.inserted).to.equal(1)
      expect(result.duplicates).to.equal(0)
      expect(result.skipped).to.equal(0)
      expect(result.unknown).to.equal(0)
    });
  })
    it("Tests for duplicates - DEPENDS ON PREVIOUS!! ", function(){
     getFileName.returns(testDataFolder + "small.csv")
     return bankData.handleCsv().then((result)=>{
        expect(result.rows).to.equal(1)
        expect(result.inserted).to.equal(0)
        expect(result.duplicates).to.equal(1)
        expect(result.skipped).to.equal(0)
        expect(result.unknown).to.equal(0)
      });

  })
})
