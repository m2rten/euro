'use strict'//
'use strict'
var db = require('./database/db')

function bankData(){
  this.insertBankData = function(transaction){
  let tr= transaction;
   var cmd = db.runAsync(`insert into transactions (trans_date,client_account,row_type,trans_date,partner_name,`+
     `trans_comment,trans_sum,currency,trans_direction,archive_num,trans_type,`+
     `ref_num,doc_num) values(?,?,?,?,?,?,?,?,?,?,?,?,?)`
     , [tr.transDate, tr.clientAccount, tr.rowType, tr.transDate, tr.partnerName, tr.transComment, tr.transSum,
     tr.currency, tr.transDirection, tr.archiveNum, tr.transType, tr.refNum, tr.docNum])
    //var cmd = db.runAsync("insert into transactions (tr_date) values (?)", transaction.transDate)
    cmd.then(()=>
  {
    console.log("db close")
  })
  }
}
module.exports ={
  bankData
}
