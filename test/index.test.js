var Analytics = require('@astronomerio/analytics.js-core').constructor;
var integration = require('@astronomerio/analytics.js-integration');
var sandbox = require('@segment/clear-env');
var tester = require('@segment/analytics.js-integration-tester');
var Resonate = require('../lib/');

describe('Resonate', function() {
  var analytics;
  var resonate;
  var cacheBuster = '123456';
  var options = {
    advkey: 'advkey',
    opptykey: 'opptykey',
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
      analytics.once('ready', done);
      analytics.initialize();
    });

    describe('#page', function () {
      it('should add img tag', function () {
        analytics.stub(resonate, 'load')
        analytics.page();
        analytics.called(resonate.load);
      });
    });

    describe('#track', function() {
      beforeEach(function () {
        analytics.stub(resonate, 'load');
      });
      it('should add img tag for defined events', function() {
        analytics.track('Email Sign Up', {});
        analytics.called(resonate.load);
      });

      it('should not fire pixel for undefined event', function () {
        analytics.track('Email Sign', {});
        analytics.didNotCall(resonate.load);
      });
    });
  });
});
