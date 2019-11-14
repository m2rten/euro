"use strict"
var { yearlyReport } = require("../../models/yearlyReport")
var { monthlyReportModel } = require("../../models/monthlyReport")

function yearlyReportController (year){
  this.year = year
  this.getYearlyReport = function(){
    var yrm = new yearlyReport(this.year)
    var mrm = new monthlyReportModel(null, this.year)

    var typesPromise = yrm.getExpenseTypes()
    var yearlyTransactionsPromise = yrm.getYearlyTransactions()
    var regularExpensesPromise = mrm.getPlanned()

    var daysInPeriod = 45

    return Promise.all([typesPromise,yearlyTransactionsPromise,regularExpensesPromise])
    .then(function(results){
      let types = results[0]
      let transactions = results[1]
      let planned = results[2]

      let report = {}
      types.forEach(type=>{
        report[type["expense_type"]]={planned:0,spent:0}
      })
      planned.forEach(item=>{
        if ((item["expense_type"] in report)===false){
          report[item["expense_type"]]={planned:0,spent:0}
        }
        var sum = Math.round(item["expense_daily_sum"]*daysInPeriod,0)
        report[item["expense_type"]]["planned"] = sum

      })
      transactions.forEach(trans=>{
        report[trans["expense_type"]].spent +=trans["trans_sum"]
        report[trans["expense_type"]].spent = Math.round(report[trans["expense_type"]].spent,0 )
      })
      return report
    })
  }
}

module.exports = {
  yearlyReportController
}
