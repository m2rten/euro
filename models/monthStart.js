var db = require ("./database/db")

function monthStart (month, year, startOrEnd, sum, medium){
  this.month = month
  this.year = year
  this.startOrEnd = startOrEnd
  this.sum = sum
  this.medium = medium
  this.getRow =  function (){
    cmd = db.getAsync ("select item_sum from month_start_end where month_num = ? and year_num  = ? and start_or_end = ? and account_type = ?",[this.month, this.year, this.startOrEnd, this.medium])
   return cmd
  }
  this.updateRow =  function (){
    cmd = db.runAsync ("update month_start_end set item_sum = ? where  month_num = ? and year_num  = ? and start_or_end = ? and account_type = ?",[this.sum, this.month, this.year, this.startOrEnd, this.medium])
   return cmd
  }
  this.addRow =  function (){
    cmd = db.runAsync ("insert into month_start_end (item_sum, month_num, year_num, start_or_end, account_type) values (?,?,?,?,?)",[this.sum, this.month, this.year, this.startOrEnd, this.medium])
   return cmd
  }
}

module.exports ={
  monthStart
}
