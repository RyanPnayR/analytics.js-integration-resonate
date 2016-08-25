![alt text](http://www.resonate.com/wp-content/uploads/2016/02/Resonate.png "Analytics.js Integration for Resonate")

#Analytics.js Integration for [Resonate](http://www.resonate.com/), by [Astronomer.io](http://www.astronomer.io/).

##Configuration
Resonate Pixel Tracking is easily setup on within your Resonate account.  Once your account is setup, simply provide the following parameters to your [Astronomer dashboard](https://app.astronomer.io/):

###Parameters from your tracking pixel: Advertising Key (`advkey`), Opportunity Key (`opptykey`)
These two parameters can be extracted from the `<img>` tag (tracking pixel) created by Resonate.  Copy everything shown after the `advkey=` and `opptykey=` until the next `&`.  In the example below, the `advkey` is `123abc` and the `opptkey` is `456def`.  We have arranged to generate a random `cacheBuster` for each custom tracking pixel, so there's no need to provide that. 
```html
  <img src="https://ds.reson8.com/insights.gif?rand={{ cacheBuster }}&t=0&pixt=resonate&advkey=123abc&opptykey=456def&evkey=789ghi&evtype=custom" width=1 height=1 border=0>
```

Last, you'll need to provide the custom name assigned to the tracking pixel (i.e. Bids) and associated unique event key (`evkey`) in the two spaces for the custom events.  The `evkey` is shown in the above pixel as `789ghi`. 

###Toggle the Resonate integration on.  You should see events being tracked in your Resonate dashboard soon after they are triggered!

##License

Released under the [MIT license](License.md).