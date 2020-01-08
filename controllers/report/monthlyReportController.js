'use strict' ;
var { monthlyReportModel } = require("../../models/monthlyReport")
var utils = require ("../../helpers/utils");

function monthlyReportController(month, year){
this.mrp = new monthlyReportModel (month, year)
this.month = month
this.year = year

if (this.month.toString().length === 1){
  this.month = "0"+this.month.toString();
}

var getToday = utils.getToday.bind(this);
var daysInMonth = utils.daysInMonth.bind(this);

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
    let plannedTotal = values[0].reduce((acc,b)=>acc + b.expense_daily_sum*daysInMonth(),0)
    let planned = values[0].map(item=>{
      return ({[item.expense_type]:item.expense_daily_sum*daysInMonth()})
    });
    planned = planned.reduce((acc,b)=> Object.assign(acc,b),{})
    let cashStart = values[1];
    let cashEnd = values[2];
    let cashDiff = cashEnd - cashStart;
    let incomingCash = values[3];
    let refund = values[4];
    let everyday = Math.round((-1)*values [5]);
    let totalSpent = cashDiff + everyday + incomingCash - refund
    let daily = {};
    daily.spent = Math.round(totalSpent/getToday())
    daily.planned = Math.round(planned.everyday/daysInMonth());
    daily.left = Math.round((planned.everyday - totalSpent)/(daysInMonth()-getToday()+1))
    let monthlyTotalSpent  = plannedTotal + totalSpent - planned.everyday;
    let response ={
      "planned":planned,
      "plannedTotal":plannedTotal,
      "Spent Cash":cashDiff + incomingCash ,
      "refund":refund,
      "everyday":everyday,
      "total Spent": everyday + plannedTotal - planned.everyday + cashDiff + incomingCash -refund,
      "daily":{
        "spent":daily.spent,
        "planned":daily.planned,
        "left":daily.left
      }
    }
    return response
  })
}

}
module.exports = {
  monthlyReportController
}
