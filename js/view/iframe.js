'use strict';

define([
    'jquery',
    'underscore',
    'marionette',
    'backbone.radio',
    'text!tmpl/iframe.html',
    'collection/users',
    'view/list'
], function($, _, Mn, Radio, templateHTML, UserCollection, listView){
    var view = Mn.View.extend({
        template: _.template(templateHTML),
        regions: {
            users: ".divUsers"
        },
        onRender: function() {
            console.log('iframe - render');
            
            var appIfrChannel = Radio.channel("app");
            this.appIfr = appIfrChannel.request("app:get");
            
            this.showChildView("users", new listView({collection: new UserCollection(this.appIfr.storeDB.users) }));
        },
        onDestroy: function() {
            console.log('iframe - destroy');
        }
    });
    
    return view;
});


