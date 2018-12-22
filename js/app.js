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
    'view/main',
    'view/about',
    'view/detail'
], 
function (Mn, Radio, pm, pmSyncParent, UserCollection, AppView, MainView, AboutView, DetailView) {
    var colUser = new UserCollection([{id:0, name:'mike', age:10}, {id:1, name:'tony', age:20}]);
    window.users = colUser;
    
    var AppRouter = Mn.AppRouter.extend({
        routes: {
            "": "home",
            "about": "about",
            "contact": "contact",
            "user/:id": "detail"
        },
        initialize: function() {
            this.app = this.options.app;
            this.mainRegion = this.app.getRegion().currentView.getRegion("main");                    
        },        
        home: function() {
            this.mainRegion.show(new MainView({collection: colUser}));
            
            //console.log("home");
        },
        about: function() {
            this.mainRegion.show(new AboutView({collection: colUser}));
            
            //console.log("about");
        },
        contact: function() {
            //console.log("contact");
        },
        detail: function(id) {
            this.mainRegion.show(new DetailView({model: colUser.get(id)}));
        }
    });
    
    var App = Mn.Application.extend({
        region: "#appRegion",
        onBeforeStart: function() {                        
            /*
            var channel = Radio.channel("basic");            
            channel.on("some:event", function(oParam){
                console.log("something happen! - " + oParam.type);
                //channel.off('some:event');
                return "aaaaaa";
            })
            
            var channelNotify = Radio.channel("notify");        
            channelNotify.reply("show:error", this.showError);
            */
        },
        getApp: function() {
            return this;  
        },
        /*
        showError: function(msg) {
            console.log("showError - " + msg);  
            return "err-101";
        },
        showError2: function(msg) {
            console.log("showError2 - " + msg);  
            return "err-102";
        },
        */
        removeUser: function(oModel) {
            this.storeDB.users.remove(oModel);
            this.oSync.setItemtoChild({
                key: "users", 
                data: this.storeDB.users
            });   
        },
        onStart: function() {
            var me = this;
            
            this.storeDB = {
                p1: {name: "abc"},
                p2: {name: "def"},
                users: colUser
            }
            
            var appChannel = Radio.channel("app");
            appChannel.reply("app:get", this.getApp, this);
            appChannel.reply("app:users:remove", this.removeUser, this);
            
            this.showView(new AppView({collection: colUser}));
            this.router = new AppRouter({"app": this});
            Backbone.history.start();
            
            //var channel = Radio.channel("basic");            
            /*
            this.listenTo(channel, 'some:event', function(oParam){
                console.log("listen to something happen! - " + oParam.type);
            });
            
            var channelNotify = Radio.channel("notify");        
            channelNotify.reply("show:error", this.showError2);
            */
                        
            
            me.oSync = new pmSyncParent(this.storeDB);
                    
            setTimeout(function() {
                me.oSync.setItemtoChild({
                    key: "p3", 
                    data: {name: "333"}
                });    
            }, 3000);
        }
    });
    
    var app = new App();
    app.start();
});