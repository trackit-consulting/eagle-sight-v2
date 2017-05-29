Ext.define('ES.view.Layout.Toolbar.Toolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.tb',
    requires: [
        'Ext.layout.container.Fit',
        'ES.view.Layout.Locale.Translation',
        'ES.util.Helper.GlobalVars',
    ],
    border: 1,
    style: {
        borderColor: 'black',
        borderStyle: 'solid'
    },
    controller: 'toolbar',
    viewModel: 'toolbar',
    items: [{
        xtype: 'image',
        alt: 'logo',
        id: 'logo',
        src: 'resources/images/logo.png',
        width: 80,
        height: 30,
        style: {
            "margin-right": "22px",
            "margin-left": "5px"
        },
        listeners: {
            afterrender: function () {

                if (ES.util.Helper.Mobile.isMobile()) {
                    Ext.getCmp("logo").setHeight(28);
                    Ext.getCmp("logo").setWidth(70);
                }

            }
        }
    },

    {
        xtype: 'image',
        id: 'en',
        alt: 'englandflag',
        width: 15,
        height: 12,
        src: 'resources/flags/england.png',
        style: {
            "opacity": "0.5"
        },
        listeners: {
            el: {
                click: "onImageClick",
                mouseover: "over",
                mouseout: "out"
            }
        }
    },
    {
        xtype: 'tbspacer',
        width: 3
    },
    {
        xtype: 'image',
        id: 'pt_PT',
        alt: 'portugalflag',
        width: 15,
        height: 12,
        src: 'resources/flags/pt.png',
        style: {
            "opacity": "0.5"
        },
        listeners: {
            el: {
                click: "onImageClick",
                mouseover: "over",
                mouseout: "out"
            }
        }
    },
    {
        xtype: 'tbspacer',
        width: 3
    },
    {
        xtype: 'image',
        id: 'fr',
        alt: 'franceflag',
        width: 15,
        height: 12,
        style: {
            "opacity": "0.5"
        },
        src: 'resources/flags/fr.png',
        listeners: {
            el: {
                click: "onImageClick",
                mouseover: "over",
                mouseout: "out"
            }
        }

    },
    {
        xtype: 'tbspacer',
        width: 3
    },
    {
        xtype: 'image',
        id: 'es',
        alt: 'spainflag',
        width: 15,
        height: 12,
        style: {
            "opacity": "0.5"
        },
        src: 'resources/flags/es.png',
        listeners: {
            el: {
                click: "onImageClick",
                mouseover: "over",
                mouseout: "out"
            }
        }

    },
        "->", {
        xtype: 'image',
        alt: 'connection',
        id: 'con',
        width: 12,
        height: 12,
        style: {
            "margin-right": "20px"
        },
        listeners: {
            afterrender: function () {

                setInterval(function () {
                    switch (ES.util.Helper.GlobalVars.countPing) {

                        case 1:

                            Ext.getCmp("con").setSrc("resources/connected/green-ball.png");

                            break;

                        case 2:

                            Ext.getCmp("con").setSrc("resources/connected/yellow-ball.png");

                            break;

                        case 3:

                            Ext.getCmp("con").setSrc("resources/connected/orange-ball.png");

                            break;

                        case 4:

                            Ext.getCmp("con").setSrc("resources/connected/red-ball.png");

                            break;

                        default:

                            Ext.getCmp("con").setSrc("resources/connected/red-ball.png");

                    }
                }, 5000);
            }
        }

    },
        /* "<-", {
             xtype: 'image',
             alt: 'project_logo',
             id: 'project_logo',
             src: 'resources/images/project_logo.png',
             width: 140,
             height: 60,
             style: {
                 "margin-right": "10px"
             },
             listeners: {
                 afterrender: function () {
 
                     if (ES.util.Helper.Mobile.isMobile()) {
                         Ext.getCmp("project_logo").setHeight(45);
                         Ext.getCmp("project_logo").setWidth(90);
                     }
 
                 }
             }
         }*/
    ]
});