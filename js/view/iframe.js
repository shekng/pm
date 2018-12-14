'use strict';

define([
    'jquery',
    'underscore',
    'marionette',
    'text!tmpl/iframe.html'
], function($, _, Mn, templateHTML){
    var view = Mn.View.extend({
        template: _.template(templateHTML),
        onRender: function() {
            console.log('iframe - render');
        },
        onDestroy: function() {
            console.log('iframe - destroy');
        }
    });
    
    return view;
});