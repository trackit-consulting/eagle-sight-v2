Ext.define('ES.view.Layout.Layout', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.layout',
    requires: [
        'Ext.layout.container.Fit',
        'ES.view.Layout.LayoutController',
        'ES.view.Layout.LayoutModel',
        'ES.view.Layout.Toolbar.ToolbarController',
        'ES.view.Layout.Toolbar.ToolbarModel',
        'ES.util.Helper.Mobile',
        'ES.util.Helper.Colors',
        'Ext.plugin.Viewport'
    ],
    
    controller: 'layout',
    viewModel: 'layout',
    layout: 'border',
    items: [{
        xtype: 'map',
        region: 'center',
        plugins: 'responsive'
    },
    {
        xtype: 'tb',
        region: 'north',
        plugins: 'responsive',
        id: 'tb',
        height: 55,
        style: {
            background: ES.util.Helper.Colors.toolbarBg,
            'text-align': 'center',
            'vertical-align': 'middle'
        },
        plugins: 'responsive',
        listeners: {
            afterrender: function () {
                

                if (ES.util.Helper.Mobile.isMobile()) {
                    Ext.getCmp("tb").setHeight(65);
                }

            }
        }
    },
    {
        region: 'west',
        layout: 'fit',
        xtype: 'timelineBar',
        title: locale.timeline,
        cls: 'x-toolbar-green',
        collapsible: true,
        collapsed: true,
        width: 320,
        height: 500,
        style: {
            background: ES.util.Helper.Colors.toolbarBg
        }
       /* listeners: {
            afterrender: {
                fn: function () {
                    if (ES.util.Helper.Mobile.isMobile()) {
                        this.collapse();
                    } else {
                        this.expand();
                    }
                }
            }
        } */
        /*,
        plugins: 'responsive',
        dockedItems: [{
            xtype: 'panel',
            height: 33,
            width: 320,
            dock: 'bottom',
            bodyStyle: {
                background: "linear-gradient(to right, #232526, #414345)",
                "color": "white",
                "padding": "8px",
                "text-align": "center",
                "letter-spacing": "1px",
                "font-size": "11px"
            },
            html: '<a style="text-decoration: none; color:white" target="_blank" href="http://www.trackit.pt/en/about-us/">' + locale.about + ' | </a><a target="_blank" style="text-decoration: none; color:white" href="http://www.trackit.pt/en/trackit-news/">' + locale.news + '</a><a style="text-decoration: none; color:white" target="_blank" href="http://www.trackit.pt/en/contacts/"> | ' + locale.contacts + '</a>'
        }]
        */
    }
    ]
});