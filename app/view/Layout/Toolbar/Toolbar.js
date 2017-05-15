Ext.define('ES.view.Layout.Toolbar.Toolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.tb',
    requires: [
        'Ext.layout.container.Fit',
        'ES.view.Layout.Locale.Translation',
        'ES.util.Helper.GlobalVars',
    ],
    controller: 'toolbar',
    viewModel: 'toolbar',
    items: ["<-", {
        xtype: 'image',
        alt: 'logo',
        id: 'logo',
        src: 'resources/images/logo.png',
        width: 90,
        height: 35,
        style: {
            "margin-left": "-16px"
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
            xtype: 'tbspacer',
            width: 20
        },
        /* {
             xtype: 'translationbtn'
         },*/
        {
            xtype: 'image',
            id: 'en',
            alt: 'englandflag',
            width: 25,
            height: 15,
            src: 'resources/nv_flags/United-Kingdom.png',
            listeners: {
                el: {
                    click: "onImageClick"
                }
            }
        },
        {
            xtype: 'tbspacer',
            width: 5
        },
        {
            xtype: 'image',
            id: 'pt_PT',
            alt: 'portugalflag',
            width: 25,
            height: 15,
            src: 'resources/nv_flags/Portugal.png',
            listeners: {
                el: {
                    click: "onImageClick"
                }
            }
        },
        {
            xtype: 'tbspacer',
            width: 5
        },
        {
            xtype: 'image',
            id: 'fr',
            alt: 'franceflag',
            width: 25,
            height: 15,
            src: 'resources/nv_flags/France.png',
            listeners: {
                el: {
                    click: "onImageClick"
                }
            }

        },
        {
            xtype: 'tbspacer',
            width: 5
        },
        {
            xtype: 'image',
            id: 'es',
            alt: 'spainflag',
            width: 25,
            height: 15,
            src: 'resources/nv_flags/Spain.png',
            listeners: {
                el: {
                    click: "onImageClick"
                }
            }

        },
        "->", {
            xtype: 'image',
            alt: 'connection',
            id: 'con',
            width: 15,
            height: 15,
            style: {

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