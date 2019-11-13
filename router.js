var users = require ('./models/users');
var userCtrl = require ('./controllers/user/userController');
var { monthStartController } = require ('./controllers/monthstart/monthStartController')
var {  cashRefundController } = require ('./controllers/cashRefund/cashRefundController')
const express = require('express');
var router = express.Router ();
var { BankDataController } = require("./controllers/file/bankDataController")
var { monthlyReportController } =  require("./controllers/report/monthlyReportController")
var { transactionsReportController } = require ("./controllers/transactions/transactionsReportController")
config = require("./config/config")

router.get('/', function (req, res){
    res.sendFile('index.html',{root:'.'});
});
router.get('/insertCsv', function (req, res){
    res.sendFile('insert_csv.html',{root:'./static'});
});
router.get('/usage', function (req, res){
    res.sendFile('app_usage.txt',{root:'./static'});
});
router.get('/monthStart', function (req, res){
    res.sendFile('monthstart.html',{root:'./static'});
});
router.get('/insertCashRefund', function (req, res){
    res.sendFile('cash_refund.html',{root:'./static'});
});

router.post('/insertCashRefund', function(req, res){
  var cashRefundCtrl = new cashRefundController(req)
  cashRefundCtrl.insertRefund().then(function(result){
    res.send(result)
  })
})

router.post('/transactions', function (req, res){
  let trCtrl = new transactionsReportController()
  trCtrl.updateTransaction(req.body.value, req.body.field, req.body.row_id)
  .then(function(result){
    res.sendFile('transactions.html',{root:'./static'});
  })
})

router.get('/transactions', function (req, res){
    res.sendFile('transactions.html',{root:'./static'});
});
router.get('/transactionsList/:year/:month', function(req, res){
let trCtrl = new transactionsReportController (req.params.month, req.params.year)
trCtrl.getTransactions()
.then(function(result){
  res.send(result)
})
})

router.post('/monthstart', (req, res)=>{
  var mCtrl = new monthStartController(req)
     mCtrl.getParams().then(function(result){
           res.send(result);
     })
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
