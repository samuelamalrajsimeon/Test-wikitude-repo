var World = {
	loaded: false,

	init: function initFn() {
		/* Disable all sensors in "IR-only" Worlds to save performance. If the property is set to true, any geo-related components (such as GeoObjects and ActionRanges) are active. If the property is set to false, any geo-related components will not be visible on the screen, and triggers will not fire.*/
		alert("starting");
		AR.context.services.sensors = false;
		//this.createOverlays();
		
        
	},

	createOverlays: function createOverlaysFn() {
		// Initialize Tracker
		// Important: If you replace the tracker file with your own, make sure to change the target name accordingly.
		// e.g. replace "pageOne" used for creating the AR.Trackeable2DOBject below, with the name of one of your new target images.
		this.tracker = new AR.Tracker("assets/targetcollections.wtc", {
			onLoaded: this.worldLoaded
		});

		// Button image
		this.imgButton = new AR.ImageResource("assets/wwwButton.jpg");

		// Create overlay for page one
		var imgOne = new AR.ImageResource("assets/Bridge-3-bays-overlay.png");
		var overlayOne = new AR.ImageDrawable(imgOne, 1, {
			offsetX: -0.15,
			offsetY: 0
		});
		var pageOneButton = this.createWwwButton("http://n1sco.com/specifications/", 0.1, {
			offsetX: -0.25,
			offsetY: -0.25,
			zOrder: 1
		});
		var weatherWidget = new AR.HtmlDrawable({
			uri: "assets/weather.html"
		}, 0.25, {
			viewportWidth: 320,
			viewportHeight: 100,
			backgroundColor: "#FFFFFF",
			offsetX: +0.36,
			offsetY: 0.5,
			horizontalAnchor: AR.CONST.HORIZONTAL_ANCHOR.RIGHT,
			verticalAnchor: AR.CONST.VERTICAL_ANCHOR.TOP,
			clickThroughEnabled: true,
			allowDocumentLocationChanges: false,
			onDocumentLocationChanged: function onDocumentLocationChangedFn(uri) {
				AR.context.openInBrowser(uri);
			}
		});
		var pageOne = new AR.Trackable2DObject(this.tracker, "Bridge-3-bays", {
			drawables: {
				cam: [overlayOne, pageOneButton, weatherWidget]
			}
		});

		// Create overlay for page two
		var imgTwo = new AR.ImageResource("assets/imageTwo.png");
		var overlayTwo = new AR.ImageDrawable(imgTwo, 0.5, {
			offsetX: 0.12,
			offsetY: -0.01
		});
		var pageTwoButton = this.createWwwButton("http://goo.gl/qxck1", 0.15, {
			offsetX: 0,
			offsetY: -0.25,
			zOrder: 1
		});
		var pageTwo = new AR.Trackable2DObject(this.tracker, "pageTwo", {
			drawables: {
				cam: [overlayTwo, pageTwoButton]
			}
		});
	},

	createWwwButton: function createWwwButtonFn(url, size, options) {
		options.onClick = function() {
			AR.context.openInBrowser(url);
		};
		return new AR.ImageDrawable(this.imgButton, size, options);
	},

	worldLoaded: function worldLoadedFn() {
//		document.getElementById('loadingMessage').innerHTML ="<button><a href='options.html'>Click me</a></button>";
//		var cssDivLeft = " style='display: table-cell;vertical-align: middle; text-align: right; width: 50%; padding-right: 15px;'";
//		var cssDivRight1 = " style='display: table-cell;vertical-align: middle; text-align: left; padding-right: 15px; width: 38px'";
//		var cssDivRight2 = " style='display: table-cell;vertical-align: middle; text-align: left; padding-right: 15px;'";
//		document.getElementById('loadingMessage').innerHTML =
//			"<div" + cssDivLeft + ">Scan Target &#35;1 (surfer) or &#35;2 (biker):</div>" +
//			"<div" + cssDivRight1 + "><img src='assets/surfer.png'></img></div>" +
//			"<div" + cssDivRight2 + "><img src='assets/bike.png'></img></div>";
		
		// Remove Scan target message after 10 sec.
		//setTimeout(function() {var e =document.getElementById('loadingMessage'); e.parentElement.removeChild(e);}, 10000);
	}
};

World.init();

//Test code
$('#test-button').click(function() {
	var wikitudePlugin = cordova.require("com.wikitude.phonegap.WikitudePlugin.WikitudePlugin");
	wikitudePlugin.captureScreen(true, null, onCapturedScreen, onErrorCaptureScreen);	
});

function onCapturedScreen() {
	alert("Captured");
}

function onErrorCaptureScreen() {
	alert("Not Captured");
}