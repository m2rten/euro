require('dotenv').config({path: 'C:\\Users\\marte\\OneDrive\\Documents\\code\\euro\\node\\config\\.e2e_test_env'})
var chai = require("chai");
var sinon = require("sinon");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var expect = chai.expect ;
//var bankDataCtrl = require("../../../controllers/file/bankDataController")
var baseDir = process.cwd()
var { monthlyReportController } = require(baseDir+"/controllers/report/monthlyReportController");
var testDataFolder = "C:\\Users\\marte\\OneDrive\\Documents\\code\\euro\\node\\test\\controllers\\file\\test_data\\"
var { BankDataController } = require(baseDir+"/controllers/file/bankDataController");

describe("We are testing monthly reports", function(){

var monthlyCtrl
var bankDataCtrl
var getFileName;
var parse;
var readCsvFromReq;

beforeEach(function(){
  bankDataCtrl = new BankDataController ()
  getFileName = sinon.stub(bankDataCtrl, "getFileName");
  parse = sinon.stub(bankDataCtrl.form, "parse");
  readCsvFromReq = sinon.stub(bankDataCtrl, "readCsvFromReq");
  readCsvFromReq.resolves()
  parse.returns(true)
})

afterEach(function (){
  sinon.restore()
})

xit("runs Hello World type of test for Reports", function(){
  expect(1).to.equal(1)
})
xit("runs Hello World type of test for Reports 2", function(){
  let report = monthlyCtrl.getMonthlyReport(2,2019)
  return  report.then(result=>{
    expect(result).to.equal(1)
  })
})

xit("tests that we are receiving the Monthly sum for September correctly", function(){
  monthlyCtrl = new monthlyReportController(9,2019)
  getFileName.returns(testDataFolder + "September.csv")
  return bankDataCtrl.handleCsv().then(()=>{
    return monthlyCtrl.getMonthlyReport()
  })
  .then(result=>{
    console.log("in the test: ",result)
    expect(result.expenses.planned.everyday).to.equal(510)
  })
})

it("tests that we are receiving the Monthly sum for September correctly", function(){
  monthlyCtrl = new monthlyReportController(9,2019)
    return monthlyCtrl.getMonthlyReport()
    .then(result=>{
      expect(result.expenses.planned.elekter).to.equal(188)
      expect(result.expenses.planned.everyday).to.equal(510)
      expect(result.expenses.planned.yearly).to.equal(83)
      expect(result.expenses.planned.events).to.equal(60)
      expect(result.expenses.planned.vaba).to.equal(150)
      expect(result.expenses.planned.lapsed).to.equal(150)
      expect(result.expenses.planned.puhkused).to.equal(60)
      expect(result.expenses.planned.kytus).to.equal(120)
      expect(result.expenses.planned.vesi).to.equal(30)
      expect(result.expenses.planned.prygi).to.equal(6)
      expect(result.expenses.planned.mobiil).to.equal(21)
      expect(result.expenses.planned.koristamine).to.equal(120)
      expect(result.expenses.planned.ulvi).to.equal(300)
      expect(result.expenses.planned.majalaen).to.equal(732)
      expect(result.expenses.planned.majapidamine).to.equal(30)
      expect(result.expenses.planned.yhekordne).to.equal(0)
      expect(result.expenses.planned.total).to.equal(2560)
      expect(result.expenses.card).to.equal(-400)
  })
})
it("tests that we are receiving the Monthly sum for October correctly", function(){
  monthlyCtrl = new monthlyReportController(10,2019)
  return monthlyCtrl.getMonthlyReport()
  .then(result=>{
    expect(result.expenses.planned.elekter).to.equal(194)
    expect(result.expenses.planned.everyday).to.equal(527)
    expect(result.expenses.planned.yearly).to.equal(85)
    expect(result.expenses.planned.events).to.equal(62)
    expect(result.expenses.planned.vaba).to.equal(155)
    expect(result.expenses.planned.lapsed).to.equal(155)
    expect(result.expenses.planned.puhkused).to.equal(62)
    expect(result.expenses.planned.kytus).to.equal(124)
    expect(result.expenses.planned.vesi).to.equal(31)
    expect(result.expenses.planned.prygi).to.equal(6)
    expect(result.expenses.planned.mobiil).to.equal(22)
    expect(result.expenses.planned.koristamine).to.equal(124)
    expect(result.expenses.planned.ulvi).to.equal(310)
    expect(result.expenses.planned.majalaen).to.equal(756)
    expect(result.expenses.planned.majapidamine).to.equal(31)
    expect(result.expenses.planned.yhekordne).to.equal(0)
    expect(result.expenses.planned.total).to.equal(2644)
    expect(result.expenses.card).to.equal(-27)
  })
})
xit("tests that we are receiving the Monthly sum for October correctly", function(){
  let report = monthlyCtrl.getMonthlyReport(10,2019)
  return  report.then(result=>{
    expect(result).to.equal(2)
  })
})

})
