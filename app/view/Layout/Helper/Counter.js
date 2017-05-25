Ext.define('ES.util.Helper.Counter', {
    statics: {
        ctdSeconds: 0,
        ctdMinutes: 0,
        ctdHours: 0,
        ctdMillis: 0,
        /**
        * Show how many time will it take to expire the Link
        * @param {object[]} timelineStore Client's Timeline Store
        * @param {object[]} routeStore Client's Route bar Store
        */
        startNewCountdown: function (timelineStore, routeStore, epoch) {
            var getEpochEnding = new Date(parseInt(epoch));
            var updateTime = setInterval(function () {
                var getTimeNow = new Date();
                var timeZone = getTimeNow.getTimezoneOffset();
                ES.util.Helper.Counter.ctdMillis = new Date(Math.abs(getEpochEnding - (getTimeNow - (timeZone * 60000))));
                ES.util.Helper.Counter.ctdSeconds = parseInt((ES.util.Helper.Counter.ctdMillis / 1000) % 60);
                ES.util.Helper.Counter.ctdMinutes = parseInt((ES.util.Helper.Counter.ctdMillis / (1000 * 60)) % 60);
                ES.util.Helper.Counter.ctdHours = parseInt((ES.util.Helper.Counter.ctdMillis / (1000 * 60 * 60)));
                ES.util.Helper.Counter.checkIfReached(getTimeNow, timeZone, getEpochEnding, timelineStore, updateTime);
                ES.util.Helper.Counter.updateCountdown(routeStore);
            }, 1000)
        },

        /**
        * Check if the page reached the expiration time
        * @param {date} getTimeNow Get current Time
        * @param {int} timeZone Get the user's time zone
        * @param {int} getEpochEnding Get the Link expiration date/time in milliseconds
        * @param {object[]} timelineStore Get the user's Timeline Store
        * @param {setInterval} updateTime Receive the countdown timer
        */
        checkIfReached: function (getTimeNow, timeZone, getEpochEnding, timelineStore, updateTime) {
            if ((getTimeNow - (timeZone * 60000)) > getEpochEnding) {
                Ext.Msg.alert(locale.alert, locale.ttl);
                ES.util.Helper.Counter.ctdSeconds = 0;
                ES.util.Helper.Counter.ctdMinutes = 0;
                ES.util.Helper.Counter.ctdHours = 0;
                ES.util.Helper.GlobalVars.isOffline = true;
                timelineStore.removeAll();
                clearInterval(updateTime);
            }
        },

        /**
        * This function is called every second to update the countdown on routebar
        * @param {object[]} routeStore Get the user's Route Store
        */
        updateCountdown: function (routeStore) {
            routeStore.each(function (rec) {
                if (rec.internalId == 1) {
                    rec.set("countdown", ES.util.Helper.Counter.ctdHours + ":" + ("0" + ES.util.Helper.Counter.ctdMinutes).substr(-2) + ":" + ("0" + ES.util.Helper.Counter.ctdSeconds).substr(-2));
                }
            });
        }
    }
});