Ext.define('ES.util.Helper.Mobile', {
    statics: {
        /**
         * Sets the translation button text
         * @param {string} text Text that the button receives
         * @param {object} button Translation button
         */
        setText: function (text, button) {
            if (ES.util.Helper.Mobile.isMobile()) {
                button.setText('');
            } else {
                button.setText(text);
            }
        },

        isMobile: function () {
            if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
                return true;
            } else {
                return false;
            }
        }
    }
});