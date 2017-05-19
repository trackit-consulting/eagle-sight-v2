Ext.define('ES.util.Helper.Token', {
    statics: {
        /**
         * Retreive all token properties
         * @param {string} dec Decrypted Token
         */
        retreiveTokenProperties: function (dec) {
            var getLng = 0, getLat = 0, getCtd = 0, getLp = 0;
            //if (ES.util.Helper.Validations.validateJSON(dec) && ES.util.Helper.Validations.validateTokenProperties(dec)) {
                getLng = dec.lng;
                getLat = dec.lat;
                getVhc = dec.vid;
                getLp = dec.lp;
            //}
            ES.util.Helper.Token.saveTokenProperties(getLng, getLat, getVhc, getLp);
        },

        /**
         * Save all token properties
         * @param {float} setLng Set the longitude from token
         * @param {float} setLat Set the latitude from token
         * @param {float} setVhc set the vehicle ID from token
         * @param {int} setType Set the vehicle type
         * @param {string} setLp Set the vehicle type
         */
        saveTokenProperties: function (setLng, setLat, setVhc, setLp) {
            localStorage.setItem("dstLng", setLng);
            localStorage.setItem("dstLat", setLat);
            localStorage.setItem("mid", setVhc);
            localStorage.setItem("vhcLp", setLp);
        },

        decryptToken: function () {
            var query = window.location.search.split("?");
            var token = query[1].split("=")[1];
            return window.atob(token);
        },

        tokenId: function () {
            var query = window.location.search.split("?");
            var token = query[1].split("=")[1];
            return String(token);
        }

    }
});