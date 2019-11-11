"use strict"
var db = require ("./database/db")

function cashRefund (transDate, partnerName, transSum, expenseType){
  this.transDate = transDate
  this.partnerName = partnerName
  this.transSum = transSum
  this.expenseType = expenseType
  this.insertCashRefund = function (){
    var cmd = db.runAsync("insert into transactions (trans_date, partner_name, trans_sum, expense_type, bank_or_cash) values (?,?,?,?,?)",[this.transDate,this.partnerName, this.transSum,this.expenseType, "cashRefund"]);
    return cmd
}
}

module.exports = {
  cashRefund
}
