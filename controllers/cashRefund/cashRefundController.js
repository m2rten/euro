"use strict"
var { cashRefund } = require("../../models/cashRefund")

 function cashRefundController (req){
   this.transDate = req.body.transDate
   this.partnerName = req.body.partnerName
   this.transSum = req.body.transSum
   this.expenseType = req.body.expenseType
   this.cashRefund = new cashRefund (this.transDate, this.partnerName, this.transSum, this.expenseType)
  this.insertRefund = function(){
  return   this.cashRefund.insertCashRefund()
     .then(function(){
       return "Insertion OK"
     })
  }
}

module.exports = {
  cashRefundController
}
