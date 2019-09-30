"use strict"
require('dotenv').config()
var db = require ('./database/db')

function UserModel(){
  this.getUsers = function (){

    var userPromise = db.getAsync("select * from users");

    userPromise.then((rows) =>{
  //    db.close()
    })

    return userPromise;
  }
}
module.exports = {
  UserModel
}
