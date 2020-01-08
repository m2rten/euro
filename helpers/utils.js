 function getToday (){
    let now = new Date()
    let a = now.getMonth() +1
    let b = now.getFullYear()
    return (this.month == (now.getMonth() + 1) && this.year == now.getFullYear()) ? now.getDate() : this.daysInMonth()
  }

  function daysInMonth (){
     var feb = this.year % 4 == 0 ? 29 : 28
     let daysInMonthMap ={
       "01":31,
       "02":feb,
       "03":31,
       "04":30,
       "05":31,
       "06":30,
       "07":31,
       "08":31,
       "09":30,
       "10":31,
       "11":30,
       "12":31
  }
  return daysInMonthMap[this.month];
}
module.exports.getToday = getToday ;
module.exports.daysInMonth = daysInMonth ;
