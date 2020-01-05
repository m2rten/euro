'use strict' ;
var { monthlyReportModel } = require("../../models/monthlyReport")

function monthlyReportController(month, year){
this.mrp = new monthlyReportModel (month, year)
this.month = month
this.year = year
if (this.month.toString().length === 1){
  this.month = "0"+this.month.toString();
}
this.response = {expenses:{planned:{total:0},card:0,cash:0,everyday:{daily:{spent:0,left:0,planned:0},total:0}}}
 this.getMonthlyReport = function (){
   return this.mrp.getPlanned()
   .then(results =>{
     results.forEach(result=>{
      this.response.expenses.planned[result.expense_type]=this.monthlySum(result.expense_daily_sum)
      this.response.expenses.planned.total += this.monthlySum(result.expense_daily_sum)
         })
 })
 .then(()=>{
   return Promise.all([this.mrp.getCardValue("start", "kaart"), this.mrp.getCardValue("end","kaart")])
 })
 .then(values=>{
   return  Promise.all([this.mrp.getCardValue("start","sula"),this.mrp.getCardValue("end","sula"), this.mrp.getCashRefundsSum("cash"), this.mrp.getCashRefundsSum("cashRefund")])
 })
 .then(values=>{
   this.response.expenses.cash =values[1] - values[0] -values[2]
   this.response.expenses.refund = values[3]
   return this.mrp.getBankPeriodSum("everyday","bank")
 })
 .then(value=>{
   this.response.expenses.everyday.total = Math.round(value) + this.response.expenses.cash  + this.response.expenses.refund
   this.response.expenses.everyday.daily.planned = Math.round(this.response.expenses.planned.everyday/this.daysInMonth())
   let total = this.response.expenses.everyday.total
   let everyday = this.response.expenses.planned.everyday
   this.response.expenses.everyday.daily.spent = Math.round(total/this.getToday())
   this.response.expenses.everyday.daily.left = Math.round((everyday + total)/(this.daysInMonth()-this.getToday()+1))
   return this.response;
 })
}

 this.getToday = function (){
   let now = new Date()
   let a = now.getMonth() +1
   let b = now.getFullYear()
   return (this.month == (now.getMonth() + 1) && this.year == now.getFullYear()) ? now.getDate() : this.daysInMonth()
 }
 this.monthlySum = function(sum){
   return Math.round(sum*this.daysInMonth())
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
  monthlyReportController
}
