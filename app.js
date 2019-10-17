const express  = require('express')
const router = require ('./router')
const app = express()
var config = require ("./config/config")
const port = config.server.port

app.use('/', router)

app.listen(port, () =>{
   console.log(`Eurp app listening on port ${port}!`)
 })

 function checker (key, value, history){
   if (typeof value === "undefined") {
    throw new Error("Undefined configuration key: "+ key.toString() +" , we cannot continue like this: "+value)
  }
  else if (typeof value === "array"){
  }
  else if (typeof (value) === "object"){
    history.push(key)
    Object.keys(value).forEach(LKey=>checker(LKey, value[LKey], history ))
  }
  else{
  console.log(history.join(".")+"."+key.trim()+":     ",value)
}
return
 }
