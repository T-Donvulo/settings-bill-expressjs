const assert = require('assert');
const BillWithSettings = require("../settings-factory");

describe("The bill with setting factory function", function() {

    it("should be able to set the call cost", function(){
        let settingsBill = BillWithSettings();
       settingsBill.setCallCost(1);
        settingsBill.setSmsCost1(5);
        settingsBill.setWarningLevel(5);
        settingsBill.setCriticalLevel(10);
        settingsBill.sendSms();
        settingsBill.makeCall();
        assert.equal(6, settingsBill.getGrandTotal());


        // let settingsBill2 = BillWithSettings();
        // settingsBill2.grandTotal(2.75);
        // assert.equal(2.75, settingsBill2.getCallCost());
    });
        it("should be able to set the sms cost", function(){
            let settingsBill = BillWithSettings();
            //settingsBill.grandTotal(0.85);
            settingsBill.setSmsCost1(0.85);
            
            assert.equal(0.85, settingsBill.getSmsCost());
    
            // let settingsBill2 = BillWithSettings();
            // settingsBill2.grandTotal(0.75);
            // assert.equal(0.75, settingsBill2.getSmsCost());   
        });    

        it("should be able to set a call and sms cost", function(){
            let settingsBill = BillWithSettings();

            settingsBill.setCallCost(2.75);
            settingsBill.setSmsCost1(0.85);

            assert.equal(0.85, settingsBill.getSmsCost());
            assert.equal(2.75, settingsBill.getCallCost());

           // let settingsBill2 = BillWithSettings();

            //settingsBill2.setCallCost(1.75);
            //settingsBill2.se(0.65);

            //assert.equal(0.65, settingsBill2.getSmsCost());
            //assert.equal(1.75, settingsBill2.getCallCost());
            
        });    

        it("should be able to set a Warning level", function(){
            let settingsBill = BillWithSettings();

            settingsBill.setWarningLevel(20);

            assert.equal(20, settingsBill.getWarningLevel());      
        });    

        it("should be able to set a Critical level cost", function(){
            let settingsBill = BillWithSettings();

            settingsBill.setCriticalLevel(40);

            assert.equal(40, settingsBill.getCriticalLevel());
        
            
        });    

        it("should be able to set the warning and critical level cost", function(){
            let settingsBill = BillWithSettings();

            settingsBill.setWarningLevel(15);
            settingsBill.setCriticalLevel(25);

            assert.equal(15, settingsBill.getWarningLevel());
            assert.equal(25, settingsBill.getCriticalLevel());
        
            
        });    
});
describe("use, values", function(){ 
    it("should be able to use the call cost set", function(){
        let settingsBill = BillWithSettings();

        settingsBill.setCallCost(2.25);
        settingsBill.setSmsCost1(0.85);
        settingsBill.setCriticalLevel(10);

        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.sendSms();
        settingsBill.sendSms();

        assert.equal(6.75, settingsBill.getTotalCallCost());
        assert.equal(1.70, settingsBill.getTotalSmsCost());
        assert.equal(8.45, settingsBill.getTotalCost());
        

    });

    it("should be able to use the call cost set for 2 calls at 1.35 each", function(){
        let settingsBill = BillWithSettings();

        settingsBill.setCallCost(1.35);
        settingsBill.setSmsCost1(0.85);
        settingsBill.setCriticalLevel(10);

        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.sendSms();

        assert.equal(3.55, settingsBill.getTotalCost().toFixed(2));
        assert.equal(2.70, settingsBill.getTotalCallCost());
        assert.equal(0.85, settingsBill.getTotalSmsCost());

    });

    it("should be able to send 2 sms's at 0.85 each", function(){
        let settingsBill = BillWithSettings();

        settingsBill.setCallCost(1.35);
        settingsBill.setSmsCost1(0.85);
        settingsBill.setCriticalLevel(10);

        settingsBill.sendSms();
        settingsBill.sendSms();

        assert.equal(1.70, settingsBill.getTotalCost());
        assert.equal(0.00, settingsBill.getTotalCallCost());
        assert.equal(1.70, settingsBill.getTotalSmsCost());
    });

    it("should be able to send 2 sms's at 0.85 and make 1 call at 1.35", function(){
        let settingsBill = BillWithSettings();

        settingsBill.setCallCost(1.35);
        settingsBill.setSmsCost1(0.85);
        settingsBill.setCriticalLevel(10);

        settingsBill.sendSms();
        settingsBill.sendSms();
        settingsBill.makeCall();

        assert.equal(3.05, settingsBill.getTotalCost());
        assert.equal(1.35, settingsBill.getTotalCallCost());
        assert.equal(1.70, settingsBill.getTotalSmsCost());

    });

describe("warning & critical level", function(){
    it("it should return a class name of 'critical' if critical level is reached", function(){
        let settingsBill = BillWithSettings();

        settingsBill.setCallCost(2.50);
        settingsBill.setSmsCost1(0.85);
        settingsBill.setWarningLevel(5);
        settingsBill.setCriticalLevel(10);

        // settingsBill.sendSms();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();

        // settingsBill.sendSms();
        
        // assert.equal( 0, settingsBill.getTotalCost());

        assert.equal( "danger", settingsBill.totalClassName());
    });

    it("it should return a class name of 'warning' if warning level is reached", function(){
        let settingsBill = BillWithSettings();

        settingsBill.setCallCost(1.35);
        settingsBill.setSmsCost1(0.85);
        settingsBill.setWarningLevel(5);
        settingsBill.setCriticalLevel(10);

        settingsBill.sendSms();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.sendSms();
        settingsBill.sendSms();
        settingsBill.sendSms();
        settingsBill.sendSms();
        
        assert.equal("warning" ,settingsBill.totalClassName());
    });


});



});

//my tests