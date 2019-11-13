"use strict"
var { transactions } = require("../../models/transactions")

function transactionsReportController (month, year){
this.month = month
this.year = year
this.getTransactions = function (){
  let transactionsModel = new transactions (month, year)
  return transactionsModel.getTransactions()
  .then (function(result){
    return result
  })
}

this.updateTransaction = function (value, field,  row_id){
  let transactionsModel = new transactions ()
  if (field=="expense_type"){
    return transactionsModel.updateExpenseType(value, row_id)
    .then(function(){
      return "transaction Updated"
    })
  }
  else if (field=="bank_or_cash"){
    return transactionsModel.updateBankOrCash(value, row_id)
    .then(function(){
      return "transaction Updated"
    })
  }
}
}

module.exports  = {
  transactionsReportController
}
