//http://localhost:1841/?token=eyJsbmciOiAtOC42NTY4NzI2LCJsYXQiOiA0MS4xNjI4NjM0LCJ2aWQiOiAxMzE2NTMsImVwb2NoIjogMTUxMzA3NzUzNDAwMCwgInR5cGUiOiAxfQ==
//{"lng": -8.6568726,"lat": 41.1628634,"vid": 131653,"epoch": 1513077534000, "type": "auth", "lp": "XX-XX-XX"};
Ext.define('ES.view.Layout.Map.MapController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.map',
    requires: [
        'Ext.container.Container',
        'Ext.layout.container.Border',
        'Ext.layout.container.Fit',
        'Ext.ux.GMapPanel',
        'Ext.ux.IFrame',
        'Ext.window.Window',
        'ES.store.RouteData',
        'ES.store.Timeline',
        'ES.util.Helper.Validations',
        'ES.util.Helper.Token',
        'ES.util.Helper.Counter',
        'ES.util.Helper.Initialize',
        'ES.util.Helper.Polyline',
        'ES.util.Helper.GlobalVars',
        'ES.util.Helper.Alerts',
        'ES.util.Helper.Timeline',
        'ES.util.Helper.Savedata',
        'ES.util.Helper.Routebar'
    ],
    config: {
        listen: {
            component: {
                'map': {
                    mapready: function (gmappanel) {

                        gmappanel.gmap.setZoom(6);
                        var isInitialized = false;

                        startService();

                        function startService() {
                            var sendPing;
                            if (!ES.util.Helper.Validations.validateToken()) {
                                //Validate and retreive token
                                if (!isInitialized) {
                                    ES.util.Helper.Validations.validateTokenProperties(ES.util.Helper.Token.decryptToken());
                                    ES.util.Helper.Token.retreiveTokenProperties(ES.util.Helper.Token.decryptToken());
                                    //Countdown to show how long does it take for the link to expire
                                    ES.util.Helper.Counter.startNewCountdown(Ext.getStore('timeline'), Ext.getStore('routedata'));
                                }
                                setTimeout(function () {
                                    if (!ES.util.Helper.GlobalVars.isOffline) {
                                        //Recover all the saved data in sessions and shows to the user when the page refreshes
                                        if (!isInitialized) {
                                            ES.util.Helper.Initialize.reloadSavedData(Ext.getStore('timeline'), localStorage.getItem('mid'));
                                            ES.util.Helper.Polyline.initPolylineDraw(gmappanel.gmap);
                                        }
                                        //Creates a new Websocket
                                        client = new WebSocket(ES.util.Helper.GlobalVars.ws, ES.util.Helper.GlobalVars.protocol);
                                        client.onopen = function () {
                                            //ES.util.Helper.Alerts.wsOpenedAlert();
                                            Ext.getCmp("con").setSrc("resources/connected/green-ball.png");
                                            //Sends the token data to the server
                                            ES.util.Helper.Initialize.sendData(client, ES.util.Helper.Token.decryptToken());

                                            //Adds a new marker to point the route destination
                                            ES.util.Helper.Initialize.addDestinationMarker(localStorage.getItem('dstLat'), localStorage.getItem('dstLng'), gmappanel.gmap);
                                            sendPing = setInterval(function () {
                                                var ping = {};
                                                ping.type = "ping";
                                                client.send(JSON.stringify(ping));
                                                ES.util.Helper.GlobalVars.countPing++;
                                                if (ES.util.Helper.GlobalVars.countPing > 3) {
                                                    client.close();
                                                }
                                            }, 15000);
                                        };
                                        client.onerror = function () {
                                            ES.util.Helper.Alerts.wsErrorAlert();
                                        };
                                        client.onclose = function () {
                                            ES.util.Helper.Alerts.wsClosedAlert();
                                            setTimeout(function () {

                                                isInitialized = true;
                                                startService();
                                            }, 10000);
                                            clearInterval(sendPing);
                                            ES.util.Helper.GlobalVars.countPing = 0;
                                        };
                                        client.onmessage = function (e) {
                                            if (!ES.util.Helper.GlobalVars.isOffline) {
                                                //Clean the timeline if necessary
                                                if (e && e.data) {
                                                    if (JSON.parse(e.data).type === "pong") {
                                                        ES.util.Helper.GlobalVars.countPing = 1;
                                                    } else {
                                                        ES.util.Helper.Timeline.cleanTimeline(Ext.getStore('timeline'));
                                                        //Save the received data
                                                        ES.util.Helper.Savedata.saveReceivedData(parseFloat(JSON.parse(e.data).params.lastRecord.loc.lat), parseFloat(JSON.parse(e.data).params.lastRecord.loc.lon), parseFloat(localStorage.getItem('dstLat')), parseFloat(localStorage.getItem('dstLng')), parseFloat(JSON.parse(e.data).params.lastRecord.gsp));
                                                        //Save the coordinates to draw on the map
                                                        ES.util.Helper.Savedata.saveCoordinates(parseFloat(JSON.parse(e.data).params.lastRecord.loc.lat), parseFloat(JSON.parse(e.data).params.lastRecord.loc.lon));
                                                        //Update the route bar with the last received data
                                                        ES.util.Helper.Routebar.requestRoutebarData(new google.maps.DirectionsService(), Ext.getStore('routedata'));
                                                        //Add a new row to the timeline
                                                        ES.util.Helper.Timeline.addTimelineRow(parseFloat(JSON.parse(e.data).params.lastRecord.vid), parseFloat(JSON.parse(e.data).params.lastRecord.hdg), Ext.getStore('timeline'));
                                                        //Check if the vehicle is parked or not
                                                        ES.util.Helper.Polyline.checkIfParked();
                                                        //Starts polyline drawing
                                                        ES.util.Helper.Polyline.initPolylineDraw(gmappanel.gmap, ES.util.Helper.Polyline.isParked());
                                                        //Follow the last received address, changing the map focus/motion
                                                        ES.util.Helper.Polyline.focusOnAddress(gmappanel.gmap);
                                                    }
                                                }
                                            } else {
                                                client.close();
                                            }
                                        };
                                    }
                                }, 1000);
                            }
                        }
                    }
                }
            }
        }
    }
});