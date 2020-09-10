module.exports = function BillWithSettings() {
    var callCost;
    var smsCost;
    var warningLevel;
    var theCriticalLevel;


    var actionList = []

    //updating my settings values 
    function setSettings(set) {
            callCost = Number(set.callCost),
            smsCost = Number(set.smsCost),
            warningLevel = set.warningLevel;
            theCriticalLevel = set.criticalLevel;

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

    function getSettings() {
        return {
            callCost: callCost,
            smsCost: smsCost,
            warningLevel: warningLevel,
            criticalLevel: theCriticalLevel

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

    function hasReachedWarningLevel(){
        return grandTotal() >= warningLevel && grandTotal() < theCriticalLevel;
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

        if (hasReachedWarningLevel()) {
            return "warning";
        }


    }

    return {
        setSettings,
        getSettings,
        checkCriticalLevel,
        getSettings,
        recordAction,
        actionsFor,
        totals,
        allTotal,
        getTotalCallCost,
        getTotalSmsCost,
        totalClassName,
        actions,
        hasReachedWarningLevel,
        checkCriticalLevel
    }

} 
