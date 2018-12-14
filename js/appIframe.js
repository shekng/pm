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
    'jquery', 'marionette', 'pm', 'pmSyncChild', 'ifrView'
], 
function ($, Mn, pm, pmSyncChild, ifrView) {
    var App = Mn.Application.extend({
        region: "#appIfr",
        onBeforeStart: function() {
        },
        onStart: function() {
            this.showView(new ifrView());
            
            this.storeDB = {};
            this.oSync = pmSyncChild(this.storeDB);
            
            this.oSync.getItem({
                item: "item1", 
                callBack: function(oData) {
                }
            });
            
            this.oSync.setItem({
                item: "item1", 
                data: "def"
            });
            
        }
    });
    
    var app = new App();
    app.start();
});