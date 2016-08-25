'use strict';

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var each = require('each');
var cacheBuster = Math.round(Math.random()*100);

/**
 * Expose `Resonate`.
 */

var Resonate = module.exports = integration('Resonate')
  .option('advkey')
  .option('opptykey')
  .mapping('events')


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

  each(events, function(event) {
    var params = {
      cacheBuster: cacheBuster,
      advkey: self.options.advkey,
      opptykey: self.options.opptykey,
      evkey: event
    };

    self.fire(params);
  });
};

Resonate.prototype.fire = function(params){

  var src = 'https://ds.reson8.com/insights.gif?rand=' + params.cacheBuster 
    + '&t=0&pixt=resonate&advkey=' + params.advkey 
    + '&opptykey=' + params.opptykey 
    + '&evkey=' + params.evkey 
    + '&evtype=custom>';

  var imgTag = document.body.appendChild(document.createElement('div'));
  imgTag.innerHTML = '<img src="' + src + '" width="1" height="1" border="0"/>';
};
