module.exports = function BillWithSettings() {
    var theCallCost = 0;
    var theSmsCost = 0;
    var theWarningLevel = 0;
    var theCriticalLevel = 0;

    var callCostTotal = 0;
    var smsCostTotal = 0;
    var sum = 0;

    var actionList = []

    function setCallCost(callCost) {
        theCallCost = callCost;
    }
    function getCallCost() {
        return {call: theCallCost}
        
    }
    function setSmsCost1(smsCost) {
        theSmsCost = smsCost;
    }


    function getSmsCost() {
        return {sms: theSmsCost}
    }

    function actions(){
return actionList;
    }
        function recordAction(action) {

        let cost = 0;
        if (action === 'sms'){
            cost = theSmsCost;
        }
        else if (action === 'call'){
            cost = theCallCost;
        }

        actionList.push({
            type: action,
            cost,
            timestamp: new Date()
        });
    }


   
  

    function getGrandTotal() {
        return callCostTotal + smsCostTotal;

    }


    function setWarningLevel(warningLevel) {
        theWarningLevel = warningLevel;
    }

    function getWarningLevel() {
        return {warning: theWarningLevel}
    }

    function setCriticalLevel(criticalLevel) {
        theCriticalLevel = criticalLevel;
    }

    function checkCriticalLevel() {
        return getTotalCost() >= getCriticalLevel();
    }
    function getCriticalLevel() {
        return {critical: theCriticalLevel}

    }

    function getTotalCost() {
      sum = callCostTotal + smsCostTotal;
        return sum;
    }

    function getTotalCallCost() {
        return callCostTotal;
    }
    function getTotalSmsCost() {
        return smsCostTotal;
    }

    function totalClassName() {

        if (getGrandTotal() >= getCriticalLevel()) {
            return "danger";
        }

        if (getGrandTotal() >= getWarningLevel()) {
            return "warning";
        }


    }

    function totals(){
        
    }

    return {
        setCallCost,
        getCallCost,
        setSmsCost1,
        getSmsCost,
        setWarningLevel,
        getWarningLevel,
        setCriticalLevel,
        recordAction,
        checkCriticalLevel,
        getCriticalLevel,
        getGrandTotal,
        getTotalCost,
        getTotalCallCost,
        getTotalSmsCost,
        totalClassName

    }

}