'use strict';

/**
 * Module dependencies.
 */

var integration = require('@astronomerio/analytics.js-integration');
var each = require('@ndhoule/each');
var cacheBuster = Math.round(Math.random()*100);

/**
 * Expose `Resonate`.
 */

var Resonate = module.exports = integration('Resonate')
  .option('advkey')
  .option('opptykey')
  .mapping('events')
  .mapping('impressionEvents')


/**
 * Initialize.
 *
 * @api public
 */

Resonate.prototype.initialize = function() {
  this.ready();
};

/**
 * Track.
 *
 * @param {Facade} track
 */

Resonate.prototype.track = function(track) {
  var events = this.events(track.event());
  var self = this;

  //For Custom Events

  each(events, function(event) {
    var params = {
      cacheBuster: cacheBuster,
      advkey: self.options.advkey,
      opptykey: self.options.opptykey,
      evkey: event,
      evtype: 'custom'
    };

    self.fire(params);
  });

  //For Impression Events

  each(impressionEvents, function(event) {
    var params = {
      cacheBuster: cacheBuster,
      advkey: self.options.advkey,
      opptykey: self.options.opptykey,
      evkey: event,
      evtype: 'impression'
    };

    self.fire(params);
  });

};

Resonate.prototype.fire = function(params){

  var src = 'https://ds.reson8.com/insights.gif?rand=' + params.cacheBuster 
    + '&t=0&pixt=resonate&advkey=' + params.advkey 
    + '&opptykey=' + params.opptykey 
    + '&evkey=' + params.evkey 
    + '&evtype=' + params.evtype;

  var imgTag = document.body.appendChild(document.createElement('div'));
  imgTag.innerHTML = '<img src="' + src + '" width="1" height="1" border="0">';
};
