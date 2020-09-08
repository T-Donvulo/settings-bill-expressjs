module.exports = function BillWithSettings() {
    var callCost;
    var smsCost;
    var theWarningLevel;
    var theCriticalLevel;

    var callCostTotal = 0;
    var smsCostTotal = 0;
    var sum = 0;

    var actionList = []


    function setCallCost(set) {
        return callCost = Number(set.callCost)
    }

    function getCallCost() {
        return callCost;

    }

    function getSmsCost() {
        return smsCost;
    }

    function setSmsCost1(setSms) {
        smsCost = Number(setSms.smsCost)
    }


    function getGrandTotal() {
        return callCostTotal + smsCostTotal;

    }

    function setWarningLevel(item) {
        theWarningLevel = item.warningLevel;
    }

    function getWarningLevel() {
        return theWarningLevel
    }

    function setCriticalLevel(item) {
        theCriticalLevel = item.criticalLevel;
    }

    function getCriticalLevel() {
        return theCriticalLevel

    }

    function checkCriticalLevel() {
        return grandTotal() >= theCriticalLevel;
    }

    function recordAction(action) {
        if (action) {
            if (!checkCriticalLevel()) {
                let cost = 0;
                if (action === 'sms') {
                    cost = smsCost;
                }
                else if (action === 'call') {
                    cost = callCost;
                }

                actionList.push({
                    type: action,
                    cost,
                    timestamp: new Date()
                });
            }
        }
    }

    function actions() {
        return actionList;
    }

    function actionsFor(type) {
        const filteredActions = [];

        // loop through all the entries in the action list 
        for (let index = 0; index < actionList.length; index++) {
            const action = actionList[index];
            // check this is the type we are doing the total for 
            if (action.type === type) {
                // add the action to the list
                filteredActions.push(action);
            }
        }
        return filteredActions;
    }

    function totals(bill) {
        let total = 0;
        for (let index = 0; index < actionList.length; index++) {
            const action = actionList[index];
            if (action.type === bill) {
                total += action.cost;
            }
        }
        return total;
    }

    function grandTotal() {
        return totals('call') + totals('sms')
    }


    function allTotal() {
        callCostTotal = totals('call').toFixed(2)
        smsCostTotal = totals('sms').toFixed(2)
        return {
            smsCostTotal,
            callCostTotal,
            grandTotal: grandTotal().toFixed(2)
        }
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

        if (grandTotal() >= theCriticalLevel) {
            return "danger";
        }

        if (grandTotal() >= theWarningLevel && grandTotal() < theCriticalLevel) {
            return "warning";
        }


    }

    return {
        setCallCost,
        getCallCost,
        getSmsCost,
        setSmsCost1,
        setWarningLevel,
        getWarningLevel,
        setCriticalLevel,
        getCriticalLevel,
        checkCriticalLevel,
        recordAction,
        actionsFor,
        totals,
        allTotal,
        getTotalCost,
        getTotalCallCost,
        getTotalSmsCost,
        totalClassName,
        actions
    }

} 
