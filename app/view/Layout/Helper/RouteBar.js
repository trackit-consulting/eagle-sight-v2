Ext.define('ES.util.Helper.Routebar', {
    statics: {
        /**
         * Request information to fill the route bar
         * @param {object} directionsService Receive function that will do the route request
         * @param {object[]} routeStore Retreive route store
         */
        requestRoutebarData: function (directionsService, routeStore) {
            var request = {
                origin: {
                    lat: ES.util.Helper.GlobalVars.lat1,
                    lng: ES.util.Helper.GlobalVars.lon1
                },
                destination: {
                    lat: ES.util.Helper.GlobalVars.lat2,
                    lng: ES.util.Helper.GlobalVars.lon2
                },
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            };
            ES.util.Helper.Routebar.updateRoutebarData(directionsService, routeStore, request);
        },

        /**
         * Request information to fill the route bar
         * @param {object} directionsService Do a route request
         * @param {object[]} routeStore Retreive route store
         * @param {string} request Receive the origin and the destination from the route
         */
        updateRoutebarData: function (directionsService, routeStore, request) {
            directionsService.route(request, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    var rec = routeStore.getRange();
                    rec[0].set("at", response.routes[0].legs[0].duration.text);
                    rec[0].set("dkm", (response.routes[0].legs[0].distance.value) / 1000);
                    rec[0].set("lp", localStorage.getItem("vhcLp"));
                    if (parseInt(ES.util.Helper.GlobalVars.vel) > 0) {
                        rec[0].set("vel", ES.util.Helper.GlobalVars.vel);
                    } else {
                        rec[0].set("vel", locale.parked);
                    }
                }
            });
        }
    }
});