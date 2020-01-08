var db = require("./database/db")
var utils = require ("../helpers/utils");

 function monthlyReportModel (month, year){
   this.month = month
   this.year = year
   var daysInMonth = utils.daysInMonth.bind(this);

   if (this.month.toString().length === 1){
     this.month = "0"+this.month.toString();
   }
   this.getPlanned = function(){
     var planned = db.getAsync("select * from regular where expense_year = ? ", this.year)
     return planned.then(rows=>{
       let result = []
       rows.forEach(row=>{
         result.push(row)
       })
       return result
     })
   }

   this.getCardValue = function (start_or_end, account_type){
     //return new Promise(resolve =>resolve(1))
     var cmd =  db.getAsync("select item_sum from month_start_end where start_or_end = ? and month_num = ? and year_num = ? and account_type = ?", [start_or_end, this.month, this.year, account_type])
     return cmd.then(sum=>{
       return sum[0] ? sum[0].item_sum : 0
     })
   }

   this.getCashRefundsSum = function (bank_or_cash){
     var cmd = db.getAsync("select coalesce(sum(trans_sum),0) as trans_sum from transactions where date(trans_date) <= ? and date(trans_date)>= ? and bank_or_cash = ? ",[`${this.year}-${this.month}-${daysInMonth()}`,`${this.year}-${this.month}-01`,bank_or_cash])
    return cmd.then(result=>{
      return result[0].trans_sum
    })
   }

   this.getIncomingCash = function (){
     var cmd = db.getAsync("select coalesce(sum(trans_sum),0) as trans_sum from transactions where date(trans_date) <= ? and date(trans_date)>= ? and bank_or_cash = ? ",[`${this.year}-${this.month}-${daysInMonth()}`,`${this.year}-01-01`,"cash"])
    return cmd.then(result=>{
      return result[0].trans_sum
    })
   }

   this.getBankPeriodSum = function (expense_type,bank_or_cash){
     var cmd = db.getAsync("select coalesce(sum(trans_sum),0) as trans_sum from transactions where date(trans_date) < ? and date(trans_date)> ? and expense_type = ? and bank_or_cash = ? and trans_sum < 0",[`${this.year}-${this.month}-${daysInMonth()}`,`${year}-${month}-01`,expense_type,bank_or_cash])
     return cmd.then(result=>{
       return result[0].trans_sum
     })
   }

}

module.exports ={
  monthlyReportModel
}
