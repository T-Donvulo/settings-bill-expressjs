const express = require ('express');

const bodyParser = require('body-parser');
const settingsBill = require('./settings-factory');
const exphbs  = require('express-handlebars');
const settings = settingsBill();
const app = express();
app.use(express.static('public'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function(req, res){
    res.render('index', {
        set: settingsBill.getCallCost,
        set: settingsBill.getSmsCost,
        set: settingsBill.getWarningLevel,
        set: settingsBill.getCriticalLevel,
        totals: settingsBill.totals

        

    }); 

});

app.post('/settings', function(req, res){
let callCost = req.body.callCost
let smsCost = req.body.smsCost
let warning = req.body.warningLevel
let critical = req.body.criticalLevel

   

    let set = {
        callCost : settings.setCallCost(callCost),
        smsCost: settings.setSmsCost1(smsCost),
        warning: settings.setWarningLevel(warning),
        critical: settings.setCriticalLevel(critical)
    }

    res.render('index', {
        set
    });

});

app.post('/action', function(req, res){

    settings.recordAction(req.body.actionType)
    res.redirect('/');
    
});

app.get('/actions', function(req, res){
    
});


app.get('/actions/:type', function(req, res){
    
});

const PORT = process.env.PORT || 3011;

app.listen(PORT, function(){
    console.log("App sstarted at PORT:", PORT)
});