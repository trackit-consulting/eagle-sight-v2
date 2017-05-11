sExt.define('ES.util.Helper.Polyline', {
    statics: {
        /**
        * Draw Polyline
        * @param {gmap} map Google Maps Widget
        */
        initPolylineDraw: function (map) {

            var lineSymbol = ES.util.Helper.Polyline.getLineSymbol(parseInt(ES.util.Helper.GlobalVars.vel), ES.util.Helper.Polyline.isParked());
            var flightPath = new google.maps.Polyline({
                path: ES.util.Helper.GlobalVars.flightPathCoordinates,
                geodesic: true,
                strokeColor: '#215647',
                strokeOpacity: 0.8,
                strokeWeight: 3,
                icons: [{
                    icon: lineSymbol,
                    offset: '100%'
                }]
            });
            ES.util.Helper.Polyline.drawPoints(flightPath, map);

            setTimeout(function () {

                flightPath.set("icons", {});

            }, 60000);


            flightPath.setMap(map);

        },

        /**
        * Choose Polyline line symbol
        * @param {int} vel Retreive vehicle speed
        * @param {int} countVel Checks if vehicle is parked or not
        */
        getLineSymbol: function (vel, countVel) {
            var lineSymbol;
            if (countVel > 1 && vel <= 0) {
                lineSymbol = {
                    path: google.maps.SymbolPath.CIRCLE,
                    strokeColor: '#841346',
                    scale: 8,
                    strokeWeight: 2
                };
            } else {
                lineSymbol = {
                    path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,
                    strokeColor: '#c61f49',
                    strokeWeight: 3
                };
            }
            return lineSymbol;
        },

        /**
        * Draw polyline points
        * @param {string[]} vel Receive route path
        * @param {object} map Google Maps Widget
        */
        drawPoints: function (flightPath, map) {
            for (var i = 0; i < flightPath.getPath().getLength(); i++) {
                new google.maps.Marker({
                    icon: {
                        url: "https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle_blue.png",
                        size: new google.maps.Size(7, 7),
                        anchor: new google.maps.Point(4, 4)
                    },
                    position: flightPath.getPath().getAt(i),
                    map: map
                });
            }
        },

        checkIfParked: function (routeStore) {
            if (ES.util.Helper.GlobalVars.vel == 0) {
                ES.util.Helper.GlobalVars.countVel++;
            }
            if (ES.util.Helper.GlobalVars.vel > 0) {
                ES.util.Helper.GlobalVars.countVel = 0;
            }
        },

        isParked: function () {
            return ES.util.Helper.GlobalVars.countVel;
        },

        /**
        * Follow the address when a new address is received via websocket
        * @param {object} map Google Maps Widget
        */
        focusOnAddress: function (map) {
            map.panTo(new google.maps.LatLng(ES.util.Helper.GlobalVars.lat1, ES.util.Helper.GlobalVars.lon1));
            map.setZoom(12);
        }
    }
});