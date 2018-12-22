'use strict';

define([
    'jquery',    
    'underscore',
    'backbone.radio',
    'marionette',
    'text!tmpl/header.html',
    'view/list'
], function($, _, Radio, Mn, templateHTML, listView){
    var view = Mn.View.extend({        
        template: _.template(templateHTML),        
        regions: {
            "users": ".divUsers"
        },
        onRender: function() {            
            console.log('header - render');

            var appChannel = Radio.channel("app");            
            this.app = appChannel.request("app:get");
            
            debugger
            this.showChildView("users", new listView({collection: this.app.storeDB.users}));
        },
        onDestroy: function() {
            console.log('header - destroy');
        }
    });
    
    return view;
});