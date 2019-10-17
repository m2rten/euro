var db = require("./database/db")

 function monthlyReportModel (month, year){
   this.month = month
   this.year = year
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
   this.daysInMonth = function(){
    var feb = this.year % 4 == 0 ? 29 : 28
    let daysInMonthMap ={
      "1":31,
      "2":feb,
      "3":31,
      "4":30,
      "5":31,
      "6":30,
      "7":31,
      "8":31,
      "9":30,
      "10":31,
      "11":30,
      "12":31
    }
    return daysInMonthMap[this.month]
   }
   this.getCashRefundsSum = function (){
     var cmd = db.getAsync("select coalesce(sum(trans_sum),0) as trans_sum from transactions where date(trans_date) <= ? and date(trans_date)>= ? and bank_or_cash = ? ",[`${this.year}-${this.month}-${this.daysInMonth()}`,`${year}-${month}-01`,"cashRefund"])
    return cmd.then(result=>{
      return result[0].trans_sum
    })
   }
   this.getBankPeriodSum = function (bank_or_cash){
     var cmd = db.getAsync("select coalesce(sum(trans_sum),0) as trans_sum from transactions where date(trans_date) < ? and date(trans_date)> ? and expense_type = ? and bank_or_cash = ? ",[`${this.year}-${this.month}-${this.daysInMonth()}`,`${year}-${month}-01`,"everyday","bank"])
     return cmd.then(result=>{
       return result[0].trans_sum
     })
   }

}

module.exports ={
  monthlyReportModel
}