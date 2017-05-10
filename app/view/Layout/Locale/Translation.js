Ext.define('ES.view.Layout.Locale.Translation', {
    extend: 'Ext.button.Split',
    requires: [
        'ES.view.Layout.Locale.TranslationController',
        'ES.view.Layout.Locale.TranslationModel'
    ],
    alias: "widget.translationbtn",
    controller: 'translation',
    viewModel: 'translation',
    menu: new Ext.menu.Menu({
        transitionType: 'slide',
        delay: 0.2,
        autoWidth: true,
        bodyStyle: {
            "background-color": "rgba(255,255,255,0.6)"
        },
        transitionDuration: 0.3,
        animate: true,
        items: [
            {
                xtype: 'menuitem',
                iconCls: 'en',
                text: 'English',
                id: 'enBtn',
                height: 30,
                listeners: {
                    click: "onMenuItemClick"
                }
            },
            {
                xtype: 'menuitem',
                iconCls: 'pt_PT',
                text: 'Português',
                id: 'ptBtn',
                height: 30,
                listeners: {
                    click: "onMenuItemClick"
                }
            },
            {
                xtype: 'menuitem',
                iconCls: 'es',
                text: 'Español',
                id: 'esBtn',
                height: 30,
                listeners: {
                    click: "onMenuItemClick"
                }
            },
            {
                xtype: 'menuitem',
                iconCls: 'fr',
                text: 'Français',
                id: 'frBtn',
                height: 30,
                listeners: {
                    click: "onMenuItemClick"
                }
            }
        ]
    })
});

