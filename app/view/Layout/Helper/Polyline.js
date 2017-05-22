Ext.define('ES.util.Helper.Polyline', {
    statics: {
        /**
         * Draw Polyline
         * @param {gmap} map Google Maps Widget
         */
        initPolylineDraw: function(map) {

            var flightPath1 = new google.maps.Polyline({
                path: ES.util.Helper.GlobalVars.flightPathCoordinates,
                strokeColor: '#fc302e', // border color
                strokeOpacity: 1.0,
                strokeWeight: 7 // You can change the border weight here
            });

            var flightPath2 = new google.maps.Polyline({
                path: ES.util.Helper.GlobalVars.flightPathCoordinates,
                strokeColor: '#d6adac',
                strokeOpacity: 1.0,
                strokeWeight: 4
            });

            ES.util.Helper.Polyline.drawPoints(flightPath1, map);

            flightPath1.setMap(map);
            flightPath2.setMap(map);
        },

        /**
         * Choose Polyline line symbol
         * @param {int} vel Retreive vehicle speed
         * @param {int} countVel Checks if vehicle is parked or not
         */
        getLineSymbol: function(vel, countVel) {
            var lineSymbol;
            if (countVel > 1 && vel <= 0) {
                return false;
            } else {
                return true;
            }
        },

        /**
         * Draw polyline points
         * @param {string[]} vel Receive route path
         * @param {object} map Google Maps Widget
         */
        drawPoints: function(flightPath, map) {
            for (var i = 0; i < ES.util.Helper.GlobalVars.markers.length; i++) {
                ES.util.Helper.GlobalVars.markers[i].setMap(null);
            }
            var getDirection;

            if (ES.util.Helper.Polyline.getLineSymbol(parseInt(ES.util.Helper.GlobalVars.vel), ES.util.Helper.Polyline.isParked())) {
                getDirection = ES.util.Helper.Polyline.getPolylineMarker(ES.util.Helper.GlobalVars.currentDirection);
            } else {
                getDirection = 'resources/pointers/pointer_stop_shrink.gif';
            }

            var licensePlate = new google.maps.MarkerImage('resources/pointers/pointer_label.gif',
                new google.maps.Size(86, 32),
                new google.maps.Point(0, 0),
                new google.maps.Point(-10, 14));

            var markerImage = new google.maps.MarkerImage(getDirection,
                new google.maps.Size(35, 35),
                new google.maps.Point(0, 0),
                new google.maps.Point(15, 15));


            var marker = new google.maps.Marker({
                icon: markerImage,
                anchor: new google.maps.Point(127, 57),
                position: flightPath.getPath().getAt(flightPath.getPath().getLength() - 1),
                map: map,
                optimized: false,
                zIndex: 99999999
            });

            ES.util.Helper.GlobalVars.markers.push(marker);

            google.maps.event.addDomListener(marker, 'click', function() {
                ES.util.Helper.Timeline.showAddress(marker.getPosition().lat(), marker.getPosition().lng(), Ext.ComponentQuery.query('map')[0]);
            });

            var showLp;
            var isVisible;
            google.maps.event.addDomListener(marker, 'mouseover', function() {
                isVisible = true;
                showLp = new google.maps.Marker({
                    icon: licensePlate,
                    label: {
                        text: localStorage.getItem("vhcLp"),
                        color: "black",
                        fontSize: "10px"
                    },
                    position: flightPath.getPath().getAt(flightPath.getPath().getLength() - 1),
                    map: map,
                    optimized: false
                });
            });

            google.maps.event.addDomListener(marker, 'mouseout', function() {
                isVisible = false;
                showLp.setMap(null);
            });
        },

        /**
         * Draw Marker
         * @param {string[]} value Receive Marker Direction
         */
        getPolylineMarker: function(value) {
            switch (value) {
                case 'N':
                    return 'resources/pointers/pointer_moving_north.gif';
                    break;
                case 'S':
                    return 'resources/pointers/pointer_moving_south.gif';
                    break;
                case 'W':
                    return 'resources/pointers/pointer_moving_west.gif';
                    break;
                case 'E':
                    return 'resources/pointers/pointer_moving_east.gif';
                    break;
                case 'NE':
                    return 'resources/pointers/pointer_moving_northeast.gif';
                    break;
                case 'NW':
                    return 'resources/pointers/pointer_moving_northwest.gif';
                    break;
                case 'SW':
                    return 'resources/pointers/pointer_moving_southwest.gif';
                    break;
                case 'SE':
                    return 'resources/pointers/pointer_moving_southeast.gif';
                    break;
                case 'NNE':
                    return 'resources/pointers/pointer_moving_northeast.gif';
                    break;
                case 'ENE':
                    return 'resources/pointers/pointer_moving_northeast.gif';
                    break;
                case 'WNW':
                    return 'resources/pointers/pointer_moving_northwest.gif';
                    break;
                case 'NNW':
                    return 'resources/pointers/pointer_moving_northwest.gif';
                    break;
                case 'SSW':
                    return 'resources/pointers/pointer_moving_southwest.gif';
                    break;
                case 'WSW':
                    return 'resources/pointers/pointer_moving_southwest.gif';
                    break;
                case 'SSE':
                    return 'resources/pointers/pointer_moving_southeast.gif';
                    break;
                case 'ESE':
                    return 'resources/pointers/pointer_moving_southeast.gif';
                default:
                    return 'resources/pointers/pointer_idle_shrink.gif';
            }
        },

        /**
         * Draw Marker
         * @param {object} routeStore Route Bar Store
         */
        checkIfParked: function() {
            if (ES.util.Helper.GlobalVars.vel == 0) {
                ES.util.Helper.GlobalVars.countVel++;
            }
            if (ES.util.Helper.GlobalVars.vel > 0) {
                ES.util.Helper.GlobalVars.countVel = 0;
            }
        },

        isParked: function() {
            return ES.util.Helper.GlobalVars.countVel;
        },

        /**
         * Follow the address when a new address is received via websocket
         * @param {object} map Google Maps Widget
         */
        focusOnAddress: function(map) {
            map.panTo(new google.maps.LatLng(ES.util.Helper.GlobalVars.lat1, ES.util.Helper.GlobalVars.lon1));
            map.setZoom(12);
        }
    }
});