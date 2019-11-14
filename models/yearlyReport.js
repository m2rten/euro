"use strict"

var db = require("./database/db")

function yearlyReport (year){
  this.year = year
  this.getExpenseTypes = function(){
    let cmd = db.getAsync("select distinct(expense_type) from transactions")
    return cmd
  }

  this.getYearlyTransactions = function(){
    let yearStart = `${this.year}-01-01`
    let yearEnd = `${this.year}-12-31`
    var cmd = db.getAsync("select * from transactions where trans_date >=date(?) and trans_date <=date(?)",[yearStart, yearEnd])
    return cmd
  }
}
module.exports = {
  yearlyReport
}
