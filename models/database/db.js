'use strict'
var sqlite3 = require("sqlite3")
var config = require('../../config/config')
var db = new sqlite3.Database (config.db.location, sqlite3.OPEN_READWRITE, (err)=>{
  if (err){
    console.log("Could not connect to db")
  }
  else
    console.log("conneted to db: ", config.db.location )
})

db.getAsync = function(sql, params) {
  var query =  function (resolve, reject){
  this.all(sql, params, function (err, rows){
    if (err)
      reject (err);
    else {
      resolve (rows)
    }
  })
  }
  return new Promise (query.bind(this));
}

db.runAsync = function (sql, params){
  var query = function(resolve, reject){
    this.run(sql, params, function(err){
      if (err){
        if ((err.message).includes("SQLITE_CONSTRAINT: UNIQUE constraint failed")){
          reject ("unique constraint")
        }
        else if ((err.message).includes("SQLITE_CONSTRAINT: NOT NULL constraint failed")){
          reject ("null constraint")
        }
        else{
          reject(err)
        }
      }
      else{
        resolve("row inserted")
      }
    })
  }
  return new Promise (query.bind(this))
}

module.exports = db
