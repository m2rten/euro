"use strict"
var { yearlyReport } = require("../../models/yearlyReport")
var { monthlyReportModel } = require("../../models/monthlyReport")

function yearlyReportController (year){
  this.year = year
  this.getYearlyReport = function(){
    var yrm = new yearlyReport(this.year)
    var mrm = new monthlyReportModel(1, this.year)

    var mrmForEndCash = new monthlyReportModel ( getEndMonth(this.year),this.year)

    var typesPromise = yrm.getExpenseTypes()
    var yearlyTransactionsPromise = yrm.getYearlyTransactions()
    var regularExpensesPromise = mrm.getPlanned()
    var sulaStartPromise = mrm.getCardValue("start","sula")
    var sulaEndPromise = mrmForEndCash.getCardValue("end","sula")
    var usedCashPromise = mrmForEndCash.getIncomingCash()
    var daysInPeriod = getDaysInPeriod(this.year)

    return Promise.all([typesPromise,yearlyTransactionsPromise,regularExpensesPromise,sulaStartPromise,sulaEndPromise])
    .then(function(results){
      let types = results[0]
      let transactions = results[1]
      let planned = results[2]
      let sulaStart = results[3]
      let sulaEnd = results[4]

      let other = {}
      types.forEach(type=>{
        other[type["expense_type"]]={planned:0,spent:0}
      })
      planned.forEach(item=>{
        if ((item["expense_type"] in other)===false){
          other[item["expense_type"]]={planned:0,spent:0}
        }
        var sum = Math.round(item["expense_daily_sum"]*daysInPeriod,0)
        other[item["expense_type"]]["planned"] = sum

      })
      transactions.forEach(trans=>{
        if (trans.expense_type==="everyday" && trans.trans_sum >0){
          return
        }
        let mark = (trans.bank_or_cash==="refund" ? 1:-1)
        other[trans["expense_type"]].spent +=trans["trans_sum"]*mark
        other[trans["expense_type"]].spent = Math.round(other[trans["expense_type"]].spent,0 )
      })
      let unfixedList = ["lapsed","majapidamine","puhkused","vaba"]
      let regularList = ["kytus","koristamine","ulvi","mobiil","vesi","prygi","vanaema"]
      let notRegularList = ["yearly","elekter","events"]
      let unfixed = {}
      let unfixedSummary = {planned:0,spent:0}
      unfixedList.forEach(item=>{
        unfixed[item] = other[item]
        unfixedSummary.planned +=unfixed[item].planned;
        unfixedSummary.spent += unfixed[item].spent;
        delete other[item]
      })
      unfixedSummary.diff = unfixedSummary.planned - unfixedSummary.spent ;
      let report = {}
      report.unfixed = unfixed ;
      report.unfixedSummary = unfixedSummary;
      [report.regular, report.regularSummary, other] =addItemList(regularList, other);
      report.other = other ;
      return report
    })
  }
}

var addItemList = function (itemList, other){
  let unfixed = {}
  let summary = {planned:0,spent:0}
  itemList.forEach(item=>{
    if (item in other){
    unfixed[item] = other[item]
     summary.planned +=unfixed[item].planned;
     summary.spent += unfixed[item].spent;
     delete other[item]
    }
  })
  summary.diff = summary.planned - summary.spent ;
  return [unfixed, summary, other]
}
var getEndMonth = function (year){
  let now = new Date()
  let cryear = now.getFullYear()
  let crmonth = now.getMonth() + 1
  return (year < cryear) ? 12 : crmonth
}

var getDaysInPeriod = function (year){
  var dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  let now = new Date()
  let cryear = now.getFullYear()
  let crmonth = now.getMonth()
  let crdays = now.getDate()
  let subtract = (year ==="2019"?273:0)
  let fullyear = (crmonth < 2 || year%4!=0) ? 0 : 1
  let response = (year<cryear ? (365 + fullyear)  :(dayCount[crmonth] + crdays - subtract + fullyear))
  return response

}
module.exports = {
  yearlyReportController
}
