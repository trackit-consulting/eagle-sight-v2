Ext.define('ES.view.Layout.Toolbar.ToolbarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.toolbar',

    changeCursor: function(image, e, options){
        Ext.getCmp(e.id).setStyle('cursor', 'pointer');
    },

    onImageClick: function (image, e, options) {
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
        location.reload();
    },

    init: function () {
        var lang = localStorage ? (localStorage.getItem('user-lang') || 'en') : 'en';
    }
});