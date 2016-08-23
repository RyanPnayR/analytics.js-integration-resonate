
var Analytics = require('analytics.js-core').constructor;
var integration = require('analytics.js-integration');
var sandbox = require('clear-env');
var tester = require('analytics.js-integration-tester');
var Resonate = require('../lib/');

describe('Resonate', function() {
  var analytics;
  var resonate;
  // var cacheBuster = Math.round(Math.random()*100);
  var cacheBuster = '123456';
  var options = {
    advkey: 'advkey',
    opptykey: 'opptykey',
    events: [      
      {
        key: 'signup',
        value: 'value'
      }]
  };

  beforeEach(function() {
    analytics = new Analytics();
    resonate = new Resonate(options);
    analytics.use(Resonate);
    analytics.use(tester);
    analytics.add(resonate);
  });

  afterEach(function() {
    analytics.restore();
    analytics.reset();
    resonate.reset();
    sandbox();
  });

  it('should have the correct settings', function() {
    analytics.compare(Resonate, integration('Resonate')
      .option('advkey')
      .option('opptykey')
      //.option('evtype') assuming all custom for now
      .mapping('events'));
  });

  describe('after loading', function() {
    beforeEach(function(done) {
      analytics.once('ready', done);
      analytics.initialize();
      analytics.page();
    });

    describe('#track', function() {
      // beforeEach(function() {
      //   analytics.spy(resonate, 'load');
      // });

      it('should not send if event is not defined', function() {
        analytics.stub(resonate, 'fire');
        analytics.track('toString');
        analytics.didNotCall(resonate.fire);
      });

      // it('should send correctly', function() {
      //   analytics.track('signup');
      //   var event = options.events[0].value;
      //   analytics.loaded('<img src="https://ds.reson8.com/insights.gif'
      //   + '?rand=' + cacheBuster
      //   + '&t=0&pixt=resonate&advkey=' + options.advkey
      //   + '&opptykey=' + options.opptykey
      //   + '&evkey=' + event
      //   + '&evtype=custom">');
      // });

      it('should have one image tag', function() {
          analytics.track('signup');
          var images = document.querySelectorAll('img');
          analytics.equal(images.length, 1);
      });
    });
  });
});