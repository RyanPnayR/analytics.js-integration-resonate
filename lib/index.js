'use strict';

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var defaults = require('defaults');
var each = require('each');
var randNum = Math.round(Math.random()*100);

/**
 * Expose `Resonate`.
 */

var Resonate = module.exports = integration('Resonate')
  .option('advkey')
  .option('opptykey')
  //.option('evtype') assuming all custom for now
  .tag('<img hrc="https://ds.reson8.com/insights.gif?rand={{ randNum }}&t=0&pixt=resonate&advkey={{ advkey }}&opptykey={{ opptykey }}&evkey={{ evkey }}&evtype=custom" width=1 height=1 border=0>')
  .mapping('events');

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
 * @api public
 * @param {Track} track
 */

Resonate.prototype.track = function(track) {
  var events = this.events(track.event());
  var self = this;
  each(events, function(evkey) {
    self.load(defaults({
      evkey: evkey
    }));
  });
};
