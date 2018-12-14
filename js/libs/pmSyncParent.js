'use strict';

define("pmSyncParent", ['jquery', 'underscore', 'pm'],
function($, _, pm) {    
    return function(oApp) {
        $.pm.unbind("pmSyncGetData");
        $.pm.bind("pmSyncGetData", function (item) {
            debugger
            return (oApp.storeDB[item]) ? oApp.storeDB[item] : undefined;            
        });    
        
        $.pm.unbind("pmSyncSetData");
        $.pm.bind("pmSyncSetData", function (oObj) {
            debugger
            if (oApp.storeDB[oObj.item]) {
                oApp.storeDB[oObj.item] = oObj.data;
            }
        });    
    }   
});

