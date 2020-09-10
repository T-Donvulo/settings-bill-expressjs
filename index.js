const express = require('express');
const bodyParser = require('body-parser');
const settingsBill = require('./settings-factory');
const exphbs = require('express-handlebars');
const settings = settingsBill();
const app = express();
const moment = require('moment');
moment().format();
app.use(express.static('public'));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function (req, res) {

    res.render('index', {
        setting: settings.getSettings(),
        allTotal: settings.allTotal(),
        color: settings.totalClassName()

    });
});

app.post('/settings', function (req, res) {

    settings.setSettings({
        callCost: req.body.callCost,
        smsCost: req.body.smsCost,
        warningLevel: req.body.warningLevel,
        criticalLevel: req.body.criticalLevel
    }),
        //   smsCost: settings.setSmsCost1(req.body.smsCost),
        //   warningLevel:  settings.setWarningLevel(req.body.warningLevel),
        //    criticalLevel: settings.setCriticalLevel(req.body.criticalLevel)

        res.redirect('/');


});

app.post('/action', function (req, res) {

    settings.recordAction(req.body.actionType)

    res.redirect('/');

});

app.get('/actions', function (req, res) {
    var actionsList = settings.actions();
    for (let keys of actionsList) {
        keys.ago = moment(keys.timeStamp).fromNow();
    }

    res.render('actions', { actions: actionsList });

});


app.get('/actions/:actionType', function (req, res) {
    var actionsList = settings.actionsFor(req.params.actionType);
    for (let keys of actionsList) {
        keys.ago = moment(keys.timeStamp).fromNow();
    }

    res.render('actions', { actions: actionsList });

});

const PORT = process.env.PORT || 3011;

app.listen(PORT, function () {
    console.log("App sstarted at PORT:", PORT)
});