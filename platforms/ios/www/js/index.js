/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        alert("Starting app");
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
		        app.wikitudePlugin = cordova.require("com.wikitude.phonegap.WikitudePlugin.WikitudePlugin");
app.wikitudePlugin.isDeviceSupported(app.onDeviceSupported, app.onDeviceNotSupported);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
	onDeviceSupported: function() {
        // ... code that is executed if the device is supported ...
		   app.wikitudePlugin._onARchitectWorldLaunchedCallback = app.onARchitectWorldLaunched;
        app.wikitudePlugin._onARchitectWorldFailedLaunchingCallback = app.onARchitectWorldFailedLaunching;


     app.wikitudePlugin.setOnUrlInvokeCallback(app.onURLInvoked);
        // load an ARchitect World
        app.wikitudePlugin.loadARchitectWorld("www/res/theWorld.html"); // load an ARchitect World from the application bundle
    
    },
    onDeviceNotSupported: function() {
        // ... code that is executed if the device is not supported ...
    }
	,
    onARchitectWorldLaunched: function() {
        // NOTE: The 'createCircle(location, color)' function is defined in the ARchitect World
        app.wikitudePlugin.callJavaScript('createCircle(new AR.RelativeLocation(null, -10, 0), \'#97FF18\');');
    },
	 onURLInvoked: function(url) {
        alert('Wikitude AR => PhoneGap ' + url);
    }
	
};
