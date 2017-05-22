Ext.define('ES.view.Layout.Toolbar.ToolbarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.toolbar',
   

    onImageClick: function (image, e, options) {
        var img = this.getView();
        var userlang = Ext.getCmp();
        img.setId(image.id);
        switch (userlang) {
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
        console.log(userlang);
        localStorage.setItem("user-lang", userlang);
        location.reload();
    },

    init: function () {
        var lang = localStorage ? (localStorage.getItem('user-lang') || 'en') : 'en';
        /*var userlang = Ext.getCmp();
      switch (userlang) {
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
        }*/
    }
});