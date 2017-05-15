Ext.define('ES.view.Layout.Toolbar.ToolbarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.toolbar',

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
});