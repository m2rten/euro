var users = require ('./models/users');
var userCtrl = require ('./controllers/user/userController');
const express = require('express');
var router = express.Router ();
var { BankDataController } = require("./controllers/file/bankDataController")
var { monthlyReportController } =  require("./controllers/report/monthlyReportController")
config = require("./config/config")

router.get('/', function (req, res){
    res.sendFile('index.html',{root:'.'});
});
router.get('/usage', function (req, res){
    res.sendFile('app_usage.txt',{root:'.'});
});

router.get('/users', (req,res)=>{
  userCtrl.getUsers().then(function(users){
    res.json(users)
  })
})

router.get('/report/:year/:month', (req,res)=>{
var monthlyReportCtrl = new monthlyReportController(req.params.month, req.params.year)
  monthlyReportCtrl.getMonthlyReport().then(function(report){
    res.json(report)
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
