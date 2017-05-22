Ext.define('ES.view.Layout.Locale.TranslationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.translation',
    requires: [
        'ES.util.Helper.Mobile'
    ],
    onMenuItemClick: function (item, e, options) {
        /*
        var menu = this.getView();
        menu.setIconCls(item.iconCls);
        menu.setText(item.text);
        localStorage.setItem("user-lang", item.iconCls);
        location.reload();
        */
    },
    init: function () {
        /*
        var lang = localStorage ? (localStorage.getItem('user-lang') || 'en') : 'en',
            button = this.getView();
        button.setIconCls(lang);
        switch (lang) {
            case 'en':
                ES.util.Helper.Mobile.setText('English', button);
                break;
            case 'pt_PT':
                ES.util.Helper.Mobile.setText('Português', button);
                break;
            case 'es':
                ES.util.Helper.Mobile.setText('Español', button);
                break;
            case 'fr':
                ES.util.Helper.Mobile.setText('Français', button);
                break;
            default:
                ES.util.Helper.Mobile.setText('English', button);
        }
        */
    }
});