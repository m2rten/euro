"use strict"
var db  = require ("./database/db")

function transactions(month, year){
this.month = month;
this.year = year;
if (this.month && this.month.toString().length === 1){
  this.month = "0"+this.month.toString();
}

this.getTransactions = function(){
  let monthStart = `${this.year}-${this.month}-01`
  let monthEnd = this.getMonthEnd ()
  var cmd = db.getAsync("select * from transactions where trans_date >=date(?) and trans_date <=date(?)",[monthStart, monthEnd])
  return cmd
}

this.updateExpenseType = function (value,  row_id){
  var cmd = db.runAsync ("update transactions set expense_type = ? where row_id = ? ",[value, row_id])
  return cmd
}

this.updateBankOrCash = function (value,  row_id){
  var cmd = db.runAsync ("update transactions set bank_or_cash = ? where row_id = ? ",[value, row_id])
  return cmd
}

this.getMonthEnd = function (){
return `${this.year}-${this.month}-${this.daysInMonth()}`
}

this.daysInMonth = function(){
 var feb = this.year % 4 == 0 ? 29 : 28
 let daysInMonthMap ={
   "01":31,
   "02":feb,
   "03":31,
   "04":30,
   "05":31,
   "06":30,
   "07":31,
   "08":31,
   "09":30,
   "10":31,
   "11":30,
   "12":31
 }
 return daysInMonthMap[this.month]
}
}
module.exports = {
  transactions
}
