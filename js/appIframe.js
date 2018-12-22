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
      ifrView: 'view/iframe',
      pm: 'libs/postmessage',
      pmSyncChild: 'libs/pmSyncChild'
  }
});

//Start up our App
require([
    'jquery', 'marionette', 'backbone.radio', 'pm', 'pmSyncChild', 'ifrView'
], 
function ($, Mn, Radio, pm, pmSyncChild, ifrView) {
    var App = Mn.Application.extend({
        region: "#appIfr",
        onBeforeStart: function() {
        },
        onStart: function() {
            var me = this;
            
            var appIfrChannel = Radio.channel("app");
            appIfrChannel.reply("app:get", this.getApp, this);
            
            me.storeDB = {a: "1"};
            me.oSync = new pmSyncChild(me.storeDB);
            
            me.oSync.getItem({
                key: "users", 
                callBack: function(oData) {
                    //debugger;
                    me.showView(new ifrView());    
                }
            });                                                    
                        
            /*
            me.oSync.getItem({
                key: "p2", 
                callBack: function(oData) {
                    debugger;
                }
            });            
            
            me.oSync.setItem({
                key: "p1", 
                data: {name: "p1p1p1"},
                callBack: function(oData) {
                    //debugger;
                }
            });
            */
        },
        getApp: function() {
            return this;
        }
    });
    
    var app = new App();
    app.start();
});