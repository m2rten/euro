var users = require ('./models/users');
var userCtrl = require ('./controllers/user/userController');
const express = require('express');
var router = express.Router ();
var { BankDataController } = require("./controllers/file/bankDataController")

config = require("./config/config")

router.get('/', function (req, res){
    res.sendFile('C:\\Users\\marte\\OneDrive\\Documents\\code\\euro\\node\\index.html');
});

router.get('/users', (req,res)=>{
  userCtrl.getUsers().then(function(users){
    res.json(users)
  })
})

router.post('/file', (req, res)=>{
    var bankData = new BankDataController();
    bankData.handleCsv(req)
    .then(result =>res.send(result))
    .catch(error => res.send("ERROR: "+error))
  })

/*router.get('/groups/:user', (req,res)=>{
  groupCtrl.getUserGroups(req.params.user).then(function(groups){
    res.json(groups)
  },
function (err){
  console.log(err)
  res.json({"error":"error"})
})
})*/

router.get('/hei', function(req, res) {
throw new Error('BROKEN')
})
module.exports =  router
