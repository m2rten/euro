require('dotenv').config({path: 'C:\\Users\\marte\\OneDrive\\Documents\\code\\euro\\node\\config\\.env'})
var chai = require("chai");
var sinon = require("sinon");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var expect = chai.expect ;
//var bankDataCtrl = require("../../../controllers/file/bankDataController")
var baseDir = process.cwd()
var { BankDataController } = require(baseDir+"/controllers/file/bankDataController");
var testDataFolder = "C:\\Users\\marte\\OneDrive\\Documents\\code\\euro\\node\\test\\controllers\\file\\test_data\\"


var smallTransaction = require("./test_data/small.js");
var algsaldo = require("./test_data/algsaldo.js")

describe("bankData tests", function(){
    var bankData = new BankDataController()
    var parse;
    var getFileName;
    var readCsvFromReq;
    var insertBankData;

  beforeEach(function(){
    parse = sinon.stub(bankData.form, "parse");
    getFileName = sinon.stub(bankData, "getFileName");
    readCsvFromReq = sinon.stub(bankData, "readCsvFromReq");
    insertBankData = sinon.stub(bankData.bankData, "insertBankData")
    readCsvFromReq.resolves()
    insertBankData.returns();
    parse.returns(true)
  })
  afterEach(function(){
  sinon.restore()
  })
  it ("runs a basic test to see that we set up everything OK ", function(done){
  done()
  })

  it("Tests that we are calling the db update with correct values ", function(){
   getFileName.returns(testDataFolder + "small.csv")
  return bankData.handleCsv().then((result)=>{
      expect(insertBankData.calledWith({"a":"a"})).to.be.false
      expect(insertBankData.calledWith(smallTransaction)).to.be.true
    });

  })
  it("Tests that we are not importing the Algsaldo line ", function(){
   getFileName.returns(testDataFolder + "alg_lopp_saldo.csv")
   return bankData.handleCsv().then((result)=>{
      expect(insertBankData.calledWith({"a":"a"})).to.be.false
      expect(insertBankData.calledWith(sinon.match({transComment: 'Algsaldo'}))).to.be.false
    });

  })
  it("Tests that we are not importing the Lõppsaldo line ", function(){
   getFileName.returns(testDataFolder + "alg_lopp_saldo.csv")
   return bankData.handleCsv().then((result)=>{
      expect(insertBankData.calledWith({"a":"a"})).to.be.false
      expect(insertBankData.calledWith(sinon.match({transComment: 'Lõppsaldo'}))).to.be.false
    });

  })
  it("Tests that we are not importing the Käive line ", function(){
   getFileName.returns(testDataFolder + "alg_lopp_saldo.csv")
   return bankData.handleCsv().then((result)=>{
      expect(insertBankData.calledWith({"a":"a"})).to.be.false
      expect(insertBankData.calledWith(sinon.match({transComment: 'Käive'}))).to.be.false
      expect(insertBankData.calledWith(sinon.match({transComment: 'K2'}))).to.be.false
    });
  })


  xit("Tests a csv file that does not exist ", function(){
    getFileName.returns(testDataFolder + "nonexistent.csv")
    return bankData.handleCsv().then((result)=>{
      console.log(result)
    });
  })
  it("Tests a csv file with missing column ", function(){
    getFileName.returns(testDataFolder + "columnMissing.csv")
    return bankData.handleCsv()
        .then((result)=>{
       })
        .catch((error)=>{
          expect(error.message).to.equal("Incorrect file for upload")
        });
  })

})
