'use strict';

define("pmSyncParent", ['jquery', 'underscore', 'pm'],
function($, _, pm) {    
    return function(oStore) {
        this.oStore = oStore
        var thisStore = oStore;    

        $.pm.unbind("pmSyncGetData");
        $.pm.bind("pmSyncGetData", function (sKey) {
            return (thisStore[sKey]) ? thisStore[sKey] : undefined;            
        });    

        $.pm.unbind("pmSyncSetData");
        $.pm.bind("pmSyncSetData", function (oObj) {
            if (thisStore[oObj.key]) {
                return thisStore[oObj.key] = oObj.data;
            }
            else {
                return undefined;
            }
        });    
                
        this.setItemtoChild = function (oParam) {
            $.pm({
                    target: $("#ifr").get(0).contentWindow,
                    type: "pmSyncSetDataToChild",
                    data: oParam,
                    success: function(oReturn) {

                    }
            });                     
        }
    };
       
});

