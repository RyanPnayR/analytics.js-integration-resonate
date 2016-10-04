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
.mapping('events')
.tag('pixel', '<img src="https://ds.reson8.com/insights.gif?rand={{ cacheBuster }}&t=0&pixt=resonate&advkey={{ advkey }}&opptykey={{ opptykey }}&evkey={{ evkey }}&evtype={{ evtype }}">');

/**
 * Initialize.
 *
 * @api public
 */

Resonate.prototype.initialize = function() {
  this.ready();
};

Resonate.prototype.loaded = function () {
  return true;
};

/**
 * Page.
 *
 * @param {Page} page
 *
 */

Resonate.prototype.page = function (page) {
  var self = this;
  var pageEventKeys = this.options.pageEventKeys;
  var advkey = this.options.advkey;
  var opptykey = this.options.opptykey;
  var cacheBuster = this.cacheBuster();

  each(function (evkey) {
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
  var pageEventKeys = this.options.pageEventKeys;
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

Resonate.prototype.cacheBuster = function () {
  return Math.round(Math.random() * 100);
};
