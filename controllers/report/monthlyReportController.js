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
    let plannedTotal = values[0].reduce((acc,b)=>acc + Math.round(b.expense_daily_sum*daysInMonth()),0)
    let planned = values[0].map(item=>{
      return ({[item.expense_type]:Math.round(item.expense_daily_sum*daysInMonth())})
    });
    planned = planned.reduce((acc,b)=> Object.assign(acc,b),{})
    let cashStart = values[1];
    let cashEnd = values[2];
    let cashDiff = cashEnd - cashStart;
    let incomingCash = values[3];
    let refund = values[4];
    let everyday = Math.round((-1)*values [5]);
    let everydaySpent = cashDiff + everyday + incomingCash - refund
    let daily = {};
    daily.spent = Math.round(everydaySpent/getToday())
    daily.planned = Math.round(planned.everyday/daysInMonth());
    daily.left = Math.round((planned.everyday - everydaySpent)/(daysInMonth()-getToday()+1))
    let totalSpent = everydaySpent + plannedTotal - planned.everyday;
    let outcome = plannedTotal - totalSpent;
    let response ={
      "planned":planned,
      "plannedTotal":plannedTotal,
      "Spent Cash":cashDiff + incomingCash ,
      "refund":refund,
      "Spent everyday":everyday,
      "Spent total": totalSpent,
      "daily":{
        "spent":daily.spent,
        "planned":daily.planned,
        "left":daily.left
      },
      "outcome": outcome
    }
    return response
  })
}

}
module.exports = {
  monthlyReportController
}
