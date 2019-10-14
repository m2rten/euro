'use strict'//
'use strict'
var db = require('./database/db')

function BankData(){
  this.insertBankData = function(transaction){
    let tr= transaction;
    transaction.transDate = transFormToSqlite(transaction.transDate)
     var cmd = db.runAsync(`insert into transactions (trans_date,client_account,row_type,trans_date,partner_name,`+
       `trans_comment,trans_sum,currency,trans_direction,archive_num,trans_type,`+
       `ref_num,doc_num,bank_or_cash,expense_type) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
       , [tr.transDate, tr.clientAccount, tr.rowType, tr.transDate, tr.partnerName, tr.transComment, tr.transSum,
       tr.currency, tr.transDirection, tr.archiveNum, tr.transType, tr.refNum, tr.docNum, tr.bankOrCash, tr.expenseType])
      //var cmd = db.runAsync("insert into transactions (tr_date) values (?)", transaction.transDate)
    return cmd;
    }
}

 function transFormToSqlite (date){
  let day, month, year;
  [day, month, year] = date.split(".")
  return (`${year}-${month}-${day}`)
}
module.exports ={
  BankData
}
