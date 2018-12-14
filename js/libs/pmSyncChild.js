'use strict';

define("pmSyncChild", ['jquery', 'underscore', 'pm'],
function($, _, pm) {    
    return function(oStore) {
        $.pm.unbind("pmSyncSetDataToChild");
        $.pm.bind("pmSyncSetDataToChild", function (oObj) {
            if (oStore[oObj.item]) {
                oStore[oObj.item] = oObj.data;
            }
        });    
        
        return {        
            getItem: function (oParam) {
                $.pm({
                        target: window.parent,
                        type: "pmSyncGetData",
                        data: oParam.item,
                        success: $.isFunction(oParam.callBack) ? oParam.callBack : $.noop
                });                     
            },
            setItem: function (oParam) {
                $.pm({
                        target: window.parent,
                        type: "pmSyncSetData",
                        data: oParam,
                        success: $.isFunction(oParam.callBack) ? oParam.callBack : $.noop
                });                     
            }


        }    
    }
});
