
var Analytics = require('analytics.js-core').constructor;
var integration = require('analytics.js-integration');
var sandbox = require('clear-env');
var tester = require('analytics.js-integration-tester');
var Resonate = require('../lib/');

describe('Resonate', function() {
  var analytics;
  var resonate;
  var cacheBuster = '123456';
  var options = {
    advkey: 'advkey',
    opptykey: 'opptykey',
    events: [      
      {
        key: 'signup',
        value: 'value'
      }],
    impressionEvents: [
      {
        key: 'pages',
        value: 'impressionValue'
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
      .mapping('events')
      .mapping('impressionEvents'));
  });

  describe('after loading', function() {
    beforeEach(function(done) {
      analytics.once('ready', done);
      analytics.initialize();
      analytics.page();
    });

    describe('#track', function() {
      it('should not send if event is not defined', function() {
        analytics.stub(resonate, 'fire');
        analytics.track('toString');
        analytics.didNotCall(resonate.fire);
      });

      it('should have one custom image tag', function() {
          analytics.track('signup');
          var images = document.querySelectorAll('img');
          analytics.equal(images.length, 1);
      });

      it('should have one impression image tag', function() {
          analytics.track('pages');
          var images = document.querySelectorAll('img');
          analytics.equal(images.length, 1);
      });      
    });
  });
});