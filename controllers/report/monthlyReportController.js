'use strict' ;
var { monthlyReportModel } = require("../../models/monthlyReport")

function monthlyReportController(month, year){
this.mrp = new monthlyReportModel (month, year)
this.month = month
this.year = year
if (this.month.toString().length === 1){
  this.month = "0"+this.month.toString();
}

var monthlySum = this.monthlySum;
var getToday = this.getToday;
var daysInMonth = this.daysInMonth ;

this.getMonthlyReport = function (){
  var promises = [];

  promises.push(this.mrp.getPlanned());
  promises.push(this.mrp.getCardValue("start","sula"));
  promises.push(this.mrp.getCardValue("end","sula"));
  promises.push(this.mrp.getCashRefundsSum("cash"));
  promises.push(this.mrp.getCashRefundsSum("cashRefund"));
  promises.push(this.mrp.getBankPeriodSum("everyday","bank"));
  return Promise.all(promises)
  .then(function(values){
    let planned = values[0].map(monthlySum());
    let plannedTotal = planned.reduce((a,b)=>{return (a+b)})
    let cashStart = values[1];
    let cashEnd = values[2];
    let cashDiff = cashEnd - cashStart;
    let incomingCash = values[3];
    let cashRefund = values[4];
    let everyday = values [5];
    let totalSpent = cashDiff + everyday - incomingCash - cashRefund
    let daily = {};
    daily.spent = Math.round(totalSpent/getToday())
    daily.total.planned = Math.round(planned.everyday/daysInMonth());
    daily.total.left = Math.round((planned.everyday - totalSpent)/(daysInMonth()-getToday()+1))
    monthlyTotalSpent  = plannedTotal + totalSpent - planned.everyday;
    let response ={
      "planned":planned,
      "plannedTotal":plannedTotal,
      "cashStart":cashStart,
    }
    return response
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
