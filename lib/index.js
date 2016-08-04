'use strict';

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var defaults = require('defaults');
var foldl = require('foldl');
var each = require('each');

/**
 * Expose `Resonate`.
 */

var Resonate = module.exports = integration('Resonate')
  .option('advkey')
  .option('opptykey')
  //.option('evtype') assuming all custom for now
  .tag('<img hrc="https://ds.reson8.com/insights.gif?rand=[Math.random()*100]&t=0&pixt=resonate&advkey={{ advkey }}&opptykey={{ opptykey }}&evkey={{ evkey }}&evtype=custom" width=1 height=1 border=0>')
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
  each(function(evkey) {
    self.load(defaults({
      evkey: evkey
    }));
  }, events);
};
