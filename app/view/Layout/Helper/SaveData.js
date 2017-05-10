Ext.define('ES.util.Helper.Savedata', {
    statics: {
        /**
         * Save user's data on global variables when the application begins
         * @param {float} lat1 Latitude from the current address
         * @param {float} lon1 Longitude from the current address
         * @param {float} lat2 Latitude from destination address
         * @param {float} lon2 Longitude from destination address
         * @param {int} vel Current vehicle speed
         * @param {string} lp License Plate
         */
        saveReceivedData: function (lat1, lon1, lat2, lon2, vel, lp) {
            ES.util.Helper.GlobalVars.lat1 = lat1;
            ES.util.Helper.GlobalVars.lon1 = lon1;
            ES.util.Helper.GlobalVars.lat2 = lat2;
            ES.util.Helper.GlobalVars.lon2 = lon2;
            ES.util.Helper.GlobalVars.vel = vel;
            ES.util.Helper.GlobalVars.lp = lp;
        },

        /**
         * Save received coordinates from web socket
         * @param {float} lat1 Latitude from the current address
         * @param {float} lon1 Longitude from the current address
         */
        saveCoordinates: function (lat1, lon1) {
            var polylineData = {
                lat: lat1,
                lng: lon1
            };
            ES.util.Helper.GlobalVars.flightPathCoordinates.push(polylineData);
        }
    }
});