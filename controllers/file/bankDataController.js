"use strict";
var { BankData } = require("../../models/bankData");
var formidable = require('formidable');
const csv = require('csv-parser')
const fs = require('fs')
const config = require("../../config/config");

function BankDataController (){
  this.bankData = new BankData();
  this.form = new formidable.IncomingForm()
  this.file = undefined ;
  this.response  = {"rows":0, "inserted":0, "duplicates":0, "skipped":0 }
  this.handleCsv = function(req){
    this.form.parse(req)
    this.form.on("fileBegin", setFilePath(this.getFileName()))
    return   this.readCsvFromReq(this.form)
       .then(()=>{
         return new Promise (readCsvFromDisk.bind(this))
       })
       .then(
         rows=>{
        let promises = []
         rows.forEach(row=>{
           this.response.rows +=1
           if (prohibitedRow(row)){
             this.response.skipped +=1
             return
           }
           row = addExpenseType(row)
           row.bankOrCash="bank"
           row.transSum = +(row.transSum).replace(",",".")
           row.transDirection === "D" ? row.transSum  = row.transSum * (-1) : null
           promises.push(this.bankData.insertBankData(row))
         })
       return Promise.all(promises.map(p => p.catch(e => e)))
     }
     ).then(results=>{
       results.forEach(result=>{
        switch (result){
          case "row inserted":
            this.response.inserted += 1
            break;
          case "unique constraint":
            this.response.duplicates +=1
            break;
          case "null constraint":
            this.response.skipped +=1
            break;
        }
       })
        this.response.unknown = (Object.values(this.response)).reduce((a,b)=>a-b)
        return this.response
       })
  }
  this.getFileName = function(){
    if (this.file===undefined){
    this.file =  config.file.location+"/"+Date.now()+".csv"
  }
  return this.file
  }
  this.readCsvFromReq = function(form){
    return new Promise(resolve=>{
        form.on("end",()=>resolve())
      })
  }
}

function addExpenseType(row){
  const expenseTypeMappings =   [
  {id:"refNum",value:"246453",expenseType:"sopakas"},
  {id:"refNum",value:"25362500003",expenseType:"sopakas"},
  {id:"refNum",value:"63530474088",expenseType:"elekter"},
  {id:"refNum",value:"101625083",expenseType:"mobiil"},
  {id:"refNum",value:"824367",expenseType:"vesi"},
  {id:"refNum",value:"63530474088",expenseType:"prygi"},
  {id:"transComment",value:"Laenu põhiosa: 05-099958-EL",expenseType:"sopakas"},
  {id:"transComment",value:"Swedbank Varakindlustuse makse: 05-099958-EL",expenseType:"sopakas"},
  {id:"transComment",value:"Kogunenud intress: 05-099958-EL",expenseType:"sopakas"}
]
  expenseTypeMappings.some(map=>{
    row.expenseType = "everyday";
    if( map.value === row[map.id]){
       row.expenseType = map.expenseType
       return true
    }
  })
  return row
}
function prohibitedRow(row){
  if (['AS','K2','LS'].includes(row.transType)){
    return true
  }
  else{
    return false
  }
}

function readCsvFromDisk(resolve, reject){
    let results = [];
    var readStream = fs.createReadStream(this.getFileName())
     readStream
     .pipe(csv({separator:';',mapHeaders:({header, index})=>changeHeaders(header)}))
     .on('headers', (headers =>{
          try{
       hasAllCols(headers)
     }
     catch(err){
      readStream.destroy()
      reject(err)
     }
     }))
     .on('data', (data) =>{
        results.push(data);
      })
     .on('end', ()=>{
      //hasAllCols(data.headers)
      resolve(results)
     })
   }

function setFilePath(path){
  return function (name,file){
    return file.path = path
  }
}

function changeHeaders(key){
  if (key  in headers){
  return headers[key]
}
return key
}

function hasAllCols(csvHeaders){
   Object.values(headers).forEach(key=>{
    if (csvHeaders.indexOf(key)<0){
        throw new Error("Incorrect file for upload")
    }
  })
}


var headers = {
"Kliendi konto":"clientAccount",
"Reatüüp":"rowType",
"Kuupäev":"transDate",
"Saaja/Maksja":"partnerName",
"Selgitus":"transComment",
"Summa":"transSum",
"Valuuta":"currency",
"Deebet/Kreedit":"transDirection",
"Arhiveerimistunnus":"archiveNum",
"Tehingu tüüp":"transType",
"Viitenumber":"refNum",
"Dokumendi number":"docNum"}

module.exports  = {
  BankDataController
}
