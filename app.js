const express  = require('express')
const router = require ('./router')
const app = express()
const port = 3000
var config = require ("./config/config")
app.use('/', router)

app.listen(port, () =>{
   Object.keys(config).forEach(key=>checker(key, config[key], []))
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
