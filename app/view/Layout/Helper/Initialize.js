Ext.define('ES.util.Helper.Initialize', {
    statics: {

        /**
        * Send the client informations to the server when the application starts
        * @param {WebSocket} client User's Web Sccket
        * @param {string} dec Decrypted token (contains the user informations)
        */
        sendId: function (client, dec) {
            var tokenId = {};
            tokenId.type = "token";
            tokenId.id = dec;
            client.send(JSON.stringify(tokenId));
        },

        /**
        * Authenticate User
        * @param {int} vid Vehicle Id
        * @param {WebSocket} client User's Web Sccket
        */
        
        authClient: function (getVid, client) {
            var auth = {};
            auth.type = "auth";
            auth.vid = getVid;
            client.send(JSON.stringify(auth));
        },

        /**
        * Send the client informations to the server when the application starts
        * @param {WebSocket} client User's Web Sccket
        * @param {string} dec Decrypted token (contains the user informations)
        */
        
        sendData: function (client, dec) {
            client.send(dec);
        },

        /**
        * Add marker to the vehicle route destination
        * @param {float} lat Latitude Destination
        * @param {float} lng Longitude Destination
        * @param {object} gmappanel Contains the Google Maps Widget
        */
        addDestinationMarker: function (lat, lng, gmappanel) {
            var markerImage = new google.maps.MarkerImage('resources/pointers/pointer_idle_shrink.gif',
                new google.maps.Size(35, 35),
                new google.maps.Point(0, 0),
                new google.maps.Point(15, 15));

                var pos = new google.maps.LatLng(lat, lng);
                var marker = new google.maps.Marker({
                    icon: markerImage,
                    position: pos,
                    title: 'Destination',
                    map: gmappanel,
                    optimized: false
                });

                ES.util.Helper.Timeline.showAddress(marker.getPosition().lat(), marker.getPosition().lng(), Ext.ComponentQuery.query('map')[0], true, marker);
                
        },

        /**
        * Reloads and shows every saved information when the user reloads the page
        * @param {object} timelineStore Retreive timeline store recorded data
        * @param {int} getVhc Retreive the vehicle ID
        */
        reloadSavedData: function (timelineStore, getVhc) {
            timelineStore.load(
                function (records, op, success) {
                    ES.util.Helper.Initialize.startReload(records, getVhc, timelineStore);
                }
            );
        },

        /**
        * Starts the reload by redrawing the polylines and the timeline again
        * @param {object[]} records Retreive timeline store recorded data
        * @param {int} getVhc Filter the records by checking the user's vehicle ID
        */
        startReload: function (records, getVhc, timelineStore) {
            var list, i;
            var sameVhc = true;
            for (i = 0; i < records.length; i++) {
                list = records[i].data;
                if (list.vid != parseInt(getVhc)) {
                    sameVhc = false;
                } else {
                    var reloadData = {
                        lat: list.lat,
                        lng: list.lng
                    };
                    ES.util.Helper.GlobalVars.flightPathCoordinates.push(reloadData);
                }
            }
            if (!sameVhc) {
                timelineStore.removeAll();
            }
        }
    }
});