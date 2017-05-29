Ext.define('ES.view.Layout.Toolbar.ToolbarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.toolbar',

    over: function(image, e, options) {
        Ext.getCmp(e.id).setStyle('cursor', 'pointer');
        Ext.getCmp(e.id).setStyle('opacity', '1');

    },

    out: function(image, e, options) {
        if (localStorage.getItem('user-lang') != e.id) {
            Ext.getCmp(e.id).setStyle('opacity', '0.5');
        }
    },

    onImageClick: function(image, e, options) {
        var lang = '';
        switch (e.id) {
            case 'en':
                lang = 'en';
                break;
            case 'pt_PT':
                lang = 'pt_PT';
                break;
            case 'es':
                lang = 'es';
                break;
            case 'fr':
                lang = 'fr';
                break;
            default:
                lang = 'en';
        }
        localStorage.setItem("user-lang", lang);
        localStorage.setItem("change-lang", true);
        location.reload();
    },

    init: function() {
        var lang = localStorage ? (localStorage.getItem('user-lang') || 'en') : 'en';
        Ext.getCmp(lang).setStyle('opacity', '0.9');
    }
});