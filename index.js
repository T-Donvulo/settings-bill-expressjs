const express = require('express');

const bodyParser = require('body-parser');
const settingsBill = require('./settings-factory');
const exphbs = require('express-handlebars');
const settings = settingsBill();
const app = express();
app.use(express.static('public'));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function (req, res) {

    //console.log(settingsBill.allTotal() )
    console.log(settings.getSmsCost())
    res.render('index', {
        callCost: settings.getCallCost(),
        smsCost: settings.getSmsCost(),
        theWarningLevel: settings.getWarningLevel(),
        theWarningLevel: settings.getCriticalLevel(),
        allTotal: settings.allTotal(),
    });
//console.log(settings.getCriticalLevel())
});

app.post('/settings', function (req, res) {
    // let callCost = req.body.callCost
    // let smsCost = req.body.smsCost
    // let warning = req.body.warningLevel
    // let critical = req.body.criticalLevel

    // let set = {
    settings.setCallCost({callCost: req.body.callCost}),
        settings.setSmsCost1({smsCost: req.body.smsCost}),
        settings.setWarningLevel({warningLevel: req.body.warningLevel}),
        settings.setCriticalLevel({criticalLevel: req.body.criticalLevel})
    // }

    // let change = {
    //     callCost,   
    //     smsCost,
    //     warning,
    //     critical
    // }
    console.log(  settings.setSmsCost1({smsCost: req.body.smsCost})); 

    res.redirect('/');


});

app.post('/action', function (req, res) {

    settings.recordAction(req.body.actionType)
   // console.log(settings.totals(req.body.actionType));

    res.redirect('/');

});

app.get('/actions', function (req, res) {
    res.render('actions', { actions: settings.actions() });
});


app.get('/actions/:actionType', function (req, res) {
    const actionType = req.params.actionType;
    res.render('actions', { actions: settings.actionsFor(actionType) });

});

const PORT = process.env.PORT || 3011;

app.listen(PORT, function () {
    console.log("App sstarted at PORT:", PORT)
});