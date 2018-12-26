'use strict';

//Configure require.js
require.config({
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: [
        'underscore',
        'jquery'
      ],
      exports: 'Backbone'
    }, 
    marionette: {
        deps: [
            'jquery',
            'underscore',
            'backbone',
            'underscore',
            'backbone.radio'
        ],
        exports: 'Mn'
    }
  },
  paths: {
      jquery: 'libs/jquery-3.3.1',
      underscore: 'libs/underscore',
      backbone: 'libs/backbone',
      text: 'libs/text',
      'backbone.radio': 'libs/backbone.radio',
      marionette: 'libs/backbone.marionette',
      pm: 'libs/postmessage',
      pmSyncParent: 'libs/pmSyncParent'
  }
});

//Start up our App
require([
    'marionette',
    'backbone.radio',
    'pm',
    'pmSyncParent',
    'collection/users',
    'view/app',
    'view/main'
], 
function (Mn, Radio, pm, pmSyncParent, UserCollection, AppView, MainView) {        
    var AppRouter = Mn.AppRouter.extend({
        routes: {
            "": "home"
        },
        initialize: function() {
            this.app = this.options.app;
            this.mainRegion = this.app.getRegion().currentView.getRegion("main");                    
        },        
        home: function() {
            this.mainRegion.show(new MainView({collection: this.app.colUser}));        
        }        
    });
    
    var App = Mn.Application.extend({
        region: "#appRegion",
        onBeforeStart: function() {                        
        },        
        onStart: function() {
            var me = this;
            
            me.colUser = new UserCollection([{id:0, name:'mike', age:10}, {id:1, name:'tony', age:20}, {id:2, name:'Cam', age:20}, {id:3, name:'Ethan', age:20}]);
            
            // main store
            me.storeDB = {
                p1: {name: "abc"},
                p2: {name: "def"},
                users: me.colUser.toArray()
            }
            
            me.appChannel = Radio.channel("app");
            
            // return app
            me.appChannel.reply("app:get", this.getApp, this);
            // remove user
            me.appChannel.reply("app:users:remove", this.removeUser, this);
            
            this.showView(new AppView({collection: me.colUser}));
            this.router = new AppRouter({"app": this});
            Backbone.history.start();
            
            // create sync parent
            me.oSyncParent = new pmSyncParent(this.storeDB);       
            
            var foo = (x) =>11+x;
            console.log(foo(10));
        },
        getApp: function() {
            return this;  
        },
        removeUser: function(oModel) {
            this.colUser.remove(oModel);
            this.storeDB["users"] = this.colUser.toArray();
            
            this.oSyncParent.setItemtoChild({
                key: "users", 
                data: this.storeDB.users
            });   
        }
    });
    
    var app = new App();
    app.start();
});