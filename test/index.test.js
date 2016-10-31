'use strict';

var Analytics = require('@astronomerio/analytics.js-core').constructor;
var integration = require('@astronomerio/analytics.js-integration');
var sandbox = require('@segment/clear-env');
var tester = require('@segment/analytics.js-integration-tester');
var Resonate = require('../lib/');

describe('Resonate', function() {
  var analytics;
  var resonate;
  var options = {
    advkey: 'advkey',
    opptykey: 'opptykey',
    identifyPixelKey: 'identifyPixelKey',
    events: {
      'Email Sign Up': 'value'
    },
    pageEventKeys: [
      'helloWorld'
    ]
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
                      .option('advkey', '')
                      .option('opptykey', '')
                      .option('pageEventKeys', [])
                      .mapping('events'));
  });

  describe('after loading', function() {
    beforeEach(function(done) {
      analytics.stub(resonate, 'load');
      analytics.once('ready', done);
      analytics.initialize();
    });

    describe('#identify', function() {
      it('should add img tag', function() {
        resonate.cacheBuster = function() {
          return 45;
        };
        analytics.identify('my_user_id');
        analytics.called(resonate.load, 'identifyPixel', {
          userId: 'my_user_id',
          advkey: 'advkey',
          opptykey: 'opptykey',
          evtype: 'custom',
          evkey: 'identifyPixelKey',
          cacheBuster: 45
        });
      });
    });

    describe('#page', function() {
      it('should add img tag', function() {
        analytics.page();
        analytics.called(resonate.load);
      });
    });

    describe('#track', function() {
      it('should add img tag for defined events', function() {
        analytics.track('Email Sign Up', {});
        analytics.called(resonate.load);
      });

      it('should not fire pixel for undefined event', function() {
        analytics.track('Email Sign', {});
        analytics.didNotCall(resonate.load);
      });
    });
  });
});
