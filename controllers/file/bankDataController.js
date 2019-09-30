"use strict";
var bD = require("../../models/bankData");
var formidable = require('formidable');
const csv = require('csv-parser')
const fs = require('fs')

function bankData (){
  this.bankData = new bD.bankData();

  this.handleCsv = function(req){
    this.file = config.file.location+"/"+Date.now()+".csv"
    var form = new formidable.IncomingForm()
  //  var readCsv = getCsvReader.bind(this)
    form.parse(req);
    form.on("fileBegin", setFilePath(this.file))

    new Promise (resolve=>{
        form.on("end", resolve)
      })
       .then(()=>{
         return new Promise (csvPromise.bind(this))
       })
       .then(results=>{
         results.forEach(result=>{
           this.bankData.insertBankData(result)
         })
       })
  }
}

/*function getCsvReader (){
      let results = [];
      fs.createReadStream(this.file)
       .pipe(csv({separator:';',mapHeaders:({header, index})=>changeHeaders(header)}))
       .on('data', (data) =>{
          results.push(data);
          this.bankData.insertBankData(data)
        })
       .on('end', () => {
         console.log(results[0])
       });
}*/

function csvPromise(resolve, reject){
    let results = [];
    fs.createReadStream(this.file)
     .pipe(csv({separator:';',mapHeaders:({header, index})=>changeHeaders(header)}))
     .on('data', (data) =>{
        results.push(data);
      })
     .on('end', ()=>{
       resolve(results)
     })
   }


function setFilePath(path){
  return function (name,file){
    return file.path = path
  }
}

function changeHeaders(key){
  var headers = {"Kliendi konto":"clientAccount",
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
  if (key  in headers){
  return headers[key]
}
return key
}

module.exports  = {
  bankData
}
