'use strict';

/**
 * Module dependencies.
 */

var integration = require('@astronomerio/analytics.js-integration');
var each = require('@ndhoule/each');

/**
 * Expose `Resonate`.
 */

var Resonate = module.exports = integration('Resonate')
.option('advkey', '')
.option('opptykey', '')
.option('pageEventKeys', [])
.option('identifyPixelKey', '')
.mapping('events')
.tag('pixel', '<img src="https://ds.reson8.com/insights.gif?rand={{ cacheBuster }}&t=0&pixt=resonate&advkey={{ advkey }}&opptykey={{ opptykey }}&evkey={{ evkey }}&evtype={{ evtype }}">')
.tag('identifyPixel', '<img src="https://ds.reson8.com/insights.gif?rand={{ cacheBuster }}&t=0&pixt=resonate&advkey={{ advkey }}&opptykey={{ opptykey }}&evkey={{ evkey }}&evtype={{ evtype }}&resnc1=esp&resnc2=open&resnc3={{ userId }}">'); // NOTE: resnc2 can either be open, subscribe, or unsubscribe. Leaving it as open for now until we get the frontend able to configure that option.

/**
 * Initialize.
 *
 * @api public
 */

Resonate.prototype.initialize = function() {
  this.ready();
};

Resonate.prototype.loaded = function() {
  return true;
};

/**
 * Identify.
 *
 * @param {Identify} identify
 *
 */

Resonate.prototype.identify = function(identify) {
  var identifyPixelKey = this.options.identifyPixelKey;
  if (!identifyPixelKey) {
    return;
  }

  var userId = identify.userId();
  var advkey = this.options.advkey;
  var opptykey = this.options.opptykey;
  var cacheBuster = this.cacheBuster();

  var params = {
    cacheBuster: cacheBuster,
    advkey: advkey,
    opptykey: opptykey,
    evtype: 'custom',
    userId: userId,
    evkey: identifyPixelKey
  };

  this.load('identifyPixel', params);
};

/**
 * Page.
 *
 * @param {Page} page
 *
 */

Resonate.prototype.page = function(page) {
  var self = this;
  var pageEventKeys = this.options.pageEventKeys;
  var advkey = this.options.advkey;
  var opptykey = this.options.opptykey;
  var cacheBuster = this.cacheBuster();

  each(function(evkey) {
    var params = {
      cacheBuster: cacheBuster,
      advkey: advkey,
      opptykey: opptykey,
      evkey: evkey,
      evtype: 'custom'
    };

    self.load('pixel', params);
  }, pageEventKeys);
};

/**
 * Track.
 *
 * @param {Facade} track
 */

Resonate.prototype.track = function(track) {
  var events = this.events(track.event());
  var self = this;
  var advkey = this.options.advkey;
  var opptykey = this.options.opptykey;
  var cacheBuster = this.cacheBuster();

  each(function(event) {
    var params = {
      cacheBuster: cacheBuster,
      advkey: advkey,
      opptykey: opptykey,
      evkey: event,
      evtype: 'custom'
    };

    self.load('pixel', params);
  }, events);
};

Resonate.prototype.cacheBuster = function() {
  return Math.round(Math.random() * 100);
};
