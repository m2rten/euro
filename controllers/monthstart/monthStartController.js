"use strict"
var { monthStart } = require ("../../models/monthStart")

function monthStartController (req){
  this.req  = req
  this.getParams = function(){
    this.month = req.body.month
    this.year = req.body.year
    this.startOrEnd = req.body.startOrEnd
    this.sum = req.body.sum
    this.medium = req.body.medium

    var ms = new monthStart (this.month, this.year, this.startOrEnd, this.sum, this.medium)
    return ms.getRow().then(function(result){
      if (result.length < 1){
        console.log("adding row")
        return ms.addRow()
      }
      else{
        return ms.updateRow()
      }
    })
    .then (function(){
      return ms.getRow()
    } )
  }
//vaadata kas on comon year, month, medium olemas
//kui jah, siis teha update
//kui ei , siis teha uus kirje

//Andmessi
//query, mis otsib (year, month, medium)  järgi
//query mis teeb update sumil, (year, month, medium) järgi
//query mis teen ibsert (sum, year, month, medium)
}

module.exports = {
  monthStartController
}
