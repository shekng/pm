'use strict';

define("pmSyncParent", ['jquery', 'underscore', 'pm'],
function($, _, pm) {    
    return function(oStore) {
        $.pm.unbind("pmSyncGetData");
        $.pm.bind("pmSyncGetData", function (item) {
            return (oStore[item]) ? oStore[item] : undefined;            
        });    
        
        $.pm.unbind("pmSyncSetData");
        $.pm.bind("pmSyncSetData", function (oObj) {
            if (oStore[oObj.item]) {
                oStore[oObj.item] = oObj.data;
            }
        });    
        
        return {
            setItemtoChild: function (oParam) {
                $.pm({
                        target: $("#ifr").get(0).contentWindow,
                        type: "pmSyncSetDataToChild",
                        data: oParam,
                        success: function(oReturn) {
                            
                        }
                });                     
            }
        }
    }   
});

