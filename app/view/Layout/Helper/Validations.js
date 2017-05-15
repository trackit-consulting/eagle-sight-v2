Ext.define('ES.util.Helper.Validations', {
    statics: {
        validateToken: function () {
            if (window.location.search === '' || window.location.search.split("?")[1].substr(5, 1) != '=' || window.location.search.split("?")[1].split("=")[0] != 'token' || window.location.search.split("?")[1].split("=")[1] == '') {
                Ext.Msg.alert(locale.alert, locale.tokenerror);
                return true;
            } else {
                return false;
            }
        },

        /**
         * Validate Token JSON
         * @param {object} dec Decrypted Token
         */
        validateJSON: function (dec) {
            try {
                var retreiveObj = JSON.parse(dec);
                localStorage.setItem("user-lang", retreiveObj.userlang);
                return true;
            } catch (e) {
                return false;
            }
        },

        /**
         * Validate Token Properties
         * @param {object} dec Decrypted Token
         */
        validateTokenProperties: function (dec) {
            if (dec && JSON.parse(dec).hasOwnProperty('lng') && JSON.parse(dec).hasOwnProperty('lat') && JSON.parse(dec).hasOwnProperty('vid') && JSON.parse(dec).hasOwnProperty('epoch') && JSON.parse(dec).hasOwnProperty('type') && JSON.parse(dec).hasOwnProperty('lp')) {
                return true;
            } else {
                return false;
            }
        }
    }
});