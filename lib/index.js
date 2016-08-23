'use strict';

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var each = require('each');
// var cacheBuster = Math.round(Math.random()*100);
var cacheBuster  = '123456';

/**
 * Expose `Resonate`.
 */

var Resonate = module.exports = integration('Resonate')
  .option('advkey')
  .option('opptykey')
  //.option('evtype') assuming all custom for now
  .mapping('events')
  // .tag('track', '<img src="https://ds.reson8.com/insights.gif?rand={{ cacheBuster }}&t=0&pixt=resonate&advkey={{ advkey }}&opptykey={{ opptykey }}&evkey={{ evkey }}&evtype=custom">');


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
  // var user = this.analytics.user();
  var events = this.events(track.event());
  var self = this;

  each(events, function(event) {
    // var evkey = event;
    // var cacheBuster = Math.round(Math.random()*100);
    // var cacheBuster = 'cacheBuster';
    var params = {
      cacheBuster: cacheBuster,
      advkey: self.options.advkey,
      opptykey: self.options.opptykey,
      evkey: event
    };

    // self.load('track', params);
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
  // imgTag.setAttribute('src', src);
  // imgTag.style.width = '1px';
  // imgTag.style.height = '1px';
  // imgTag.style.border = '0';
  imgTag.innerHTML = '<img src="' + src + '" width="1" height="1" border="0"/>';

};
