Ext.define('ES.util.Helper.Timeline', {
    statics: {
        /**
         * Save received coordinates from web socket
         * @param {object[]} timelineStore Receive Timeline store
         */
        cleanTimeline: function(timelineStore) {
            setInterval(function() {
                var gridStore = Ext.getCmp('timelineBar').getStore();
                timelineStore.each(function(rec) {
                    var time = rec.data.time;
                    var gcTime = new Date();
                    var gcTimeStr = gcTime.getHours() + ":" + gcTime.getMinutes() + ":" + gcTime.getSeconds();
                    if ((ES.util.Helper.Timeline.hmsToSeconds(gcTimeStr) - ES.util.Helper.Timeline.hmsToSeconds(time)) > 120) {
                        rec.set("hidden", true);
                    }
                });
            }, 14000)
        },

        /**
         * Add new row to the timeline
         * @param {object[]} timelineStore Receive Timeline store
         * @param {int} vid Receive the vehicle ID
         * @param {int} hdg Receive vehicle direction
         */
        addTimelineRow: function(vid, hdg, timelineStore) {
            var date = new Date();
            var hour = ("0" + date.getHours()).substr(-2);
            var minutes = ("0" + date.getMinutes()).substr(-2);
            var seconds = ("0" + date.getSeconds()).substr(-2);
            var specifyInfo = {
                vid: vid,
                time: hour + ":" + minutes + ":" + seconds,
                lat: ES.util.Helper.GlobalVars.lat1,
                lng: ES.util.Helper.GlobalVars.lon1,
                address: locale.show,
                dir: ES.util.Helper.Timeline.degToCompass(hdg),
                vel: ES.util.Helper.GlobalVars.vel,
                hidden: false
            };
            ES.util.Helper.GlobalVars.currentDirection = ES.util.Helper.Timeline.degToCompass(hdg);
            timelineStore.add(specifyInfo);
            timelineStore.save();
        },

        /**
         * Turn hours, minutes and seconds to seconds
         * @param {string} str Receive time
         */
        hmsToSeconds: function(str) {
            var p = str.split(':'),
                s = 0,
                m = 1;
            while (p.length > 0) {
                s += m * parseInt(p.pop(), 10);
                m *= 60;
            }
            return s;
        },
        /**
         * Turn degrees to compass
         * @param {int} num Receive vehicle position
         */
        degToCompass: function(num) {
            var val = Math.floor((num / 22.5) + 0.5);
            var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
            return arr[(val % 16)];
        },
        /**
         * Show info window on map
         * @param {float} lat Latitude from the address to show
         * @param {lng} lng Longitude from the address to show
         * @param {object} newInformation Google Maps Widget
         * @param {boolean} disableAutoPan Disable auto focus
         * @param {object} marker Marker that will receive the info window
         */
        showAddress: function(lat, lng, newInformation, disableAutoPan, marker) {
            var geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng(lat, lng);
            geocoder.geocode({
                'latLng': latlng
            }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        if (!disableAutoPan) {
                            newInformation.addInfoWindow(results[0].formatted_address, lat, lng);
                        } else {
                            var infoWindow = new google.maps.InfoWindow({
                                content: "Destination Point: " + results[0].formatted_address,
                                disableAutoPan: true
                            });
                            infoWindow.open(newInformation, marker);
                        }
                    } else {
                        ES.util.Helper.Alerts.wsNoResults();
                    }
                } else {
                    ES.util.Helper.Alerts.wsGeocoderError(status);
                }
            });
        }
    }
});