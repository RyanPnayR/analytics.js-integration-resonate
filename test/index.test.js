'use strict';

var Analytics = require('@segment/analytics.js-core').constructor;
var integration = require('@segment/analytics.js-integration');
var sandbox = require('@segment/clear-env');
var tester = require('@segment/analytics.js-integration-tester');
var Resonate = require('../lib/');

describe('Resonate', function() {
  var analytics;
  var resonate;
  var options = {
    advkey: '0010M00001QNbLwQAL',
    opptykey: 'EBTH0616A',
    events: {
      partnerSellerContact: '151749',
      bidOnItem: '151748',
      followedItem: '151747',
      viewedProductCategory: '151746',
      viewedProduct: '151745',
      newUserSignup: '151744'
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
      .tag('<img hrc="https://ds.reson8.com/insights.gif?rand=[Math.random()*100]&t=0&pixt=resonate&advkey={{ advkey }}&opptykey={{ opptykey }}&evkey={{ evkey }}&evtype=custom" width=1 height=1 border=0>')
      .mapping('events'));
  });

  describe('after loading', function() {
    beforeEach(function(done) {
      analytics.once('ready', done);
      analytics.initialize();
      analytics.page();
    });

    describe('#page', function() {
      beforeEach(function() {
        analytics.spy(resonate, 'load');
      });
    });

    describe('#track', function() {
      beforeEach(function() {
        analytics.spy(resonate, 'load');
      });

      it('should not send if event is not defined', function() {
        analytics.track('toString');
        analytics.didNotCall(resonate.load);
      });
    });
  });
});
