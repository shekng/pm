'use strict';

define("pmSyncChild", ['jquery', 'underscore', 'pm'],
function($, _, pm) {    
    return {        
        getItem: function (oParam) {
            debugger
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
});
