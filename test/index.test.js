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
      'signup': 'value'
    },
    impressionEvents: {
      'pages': 'impressionValue'
    }
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
        var imgCount = document.getElementsByTagName('img').length;
        analytics.track('signup');
        var newImgCount = document.getElementsByTagName('img').length;
        analytics.equal(newImgCount, imgCount + 1);
      });

      it('should have one impression image tag', function() {
        var imgCount = document.getElementsByTagName('img').length;
        analytics.track('pages');
        var newImgCount = document.getElementsByTagName('img').length;
        analytics.equal(newImgCount, imgCount + 1);
      });
    });
  });
});
