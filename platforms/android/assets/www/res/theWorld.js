// JavaScript Document
var tracker = new AR.Tracker("caffeine.wtc");

// The second parameter is the height of the label in SDUs
// You can read about SDUs here...
// ...http://www.wikitude.com/external/doc/documentation/3.0/Reference/JavaScript%20Reference/module_AR.html
var overlay = new AR.Label("CALDWELL", 1);
var wid = new AR.HtmlDrawable({ uri:"widget.html"},0.25,{viewPortWidth:320,viewPortHeight:100,backgroundColor:"#FFFFFF",offsetX:+0.36,offsetY:0.5,horizontalAnchor: AR.CONST.HORIZONTAL_ANCHOR.RIGHT,
    verticalAnchor: AR.CONST.VERTICAL_ANCHOR.TOP,
    clickThroughEnabled: true,
    allowDocumentLocationChanges: false,updateRate:AR.HtmlDrawable.UPDATE_RATE.STATIC,
    onDocumentLocationChanged: function onDocumentLocationChangedFn(uri) {
        AR.context.openInBrowser(uri);}
		});

new AR.Trackable2DObject(tracker, "target", {drawables: {cam: wid}});
