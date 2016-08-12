
var Analytics = require('analytics.js-core').constructor;
var integration = require('analytics.js-integration');
var sandbox = require('clear-env');
var tester = require('analytics.js-integration-tester');
var Resonate = require('../lib/');
var randNum = Math.round(Math.rand() * 100);

describe('Resonate', function() {
  var analytics;
  var resonate;
  var options = {
    advkey: '0010M00001QNbLwQAL',
    opptykey: 'EBTH0616A',
    events: {
      partner_seller: '151749',
      bid_on_item: '151748',
      followed_item: '151747',
      viewed_product_category: '151746',
      viewed_product: '151745',
      new_user_signup: '151744'
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
      //.option('evtype') assuming all custom for now
      .tag('<img hrc="https://ds.reson8.com/insights.gif?rand={{ randNum }}&t=0&pixt=resonate&advkey={{ advkey }}&opptykey={{ opptykey }}&evkey={{ evkey }}&evtype=custom" width=1 height=1 border=0>')
      .mapping('events'));
  });

  describe('after loading', function() {
    beforeEach(function(done) {
      analytics.once('ready', done);
      analytics.initialize();
      analytics.page();
    });

    describe('#track', function() {
      beforeEach(function() {
        analytics.spy(resonate, 'load');
      });

      it('should not send if event is not defined', function() {
        analytics.track('toString');
        analytics.didNotCall(resonate.load);
      });

      it('should send correctly', function() {
        analytics.track('partner_seller');
        analytics.loaded('<img hrc="https://ds.reson8.com/insights.gif?rand={{ randNum }}t=0&pixt=resonate&advkey={{ advkey }}&opptykey={{ opptykey }}&evkey=151749&evtype=custom" width=1 height=1 border=0>');
      });
    });
  });
});