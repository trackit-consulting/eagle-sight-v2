Ext.define('ES.view.Layout.Toolbar.ToolbarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.toolbar',

    requires: [
        'ES.util.Helper.Mobile'
    ],


    onImageClick: function (image, e, options) {
        var menu = this.getView();
        var user_lang = this.getId();
        menu.setId(image.id);
        switch (image.id) {
            case 'en':
                user_lang = 'en';
                break;
            case 'pt_PT':
                user_lang = 'pt_PT';
                break;
            case 'es':
                user_lang = 'es';
                break;
            case 'fr':
                user_lang = 'fr';
                break;
            default:
                user_lang = 'en';
        }
        localStorage.setItem("user-lang", lang);
        location.reload();
    },
   /* init: function () {
        var lang = localStorage ? (localStorage.getItem('user-lang') || 'en') : 'en',
            button = this.getView();
        button.setId(lang);
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
    }*/
});