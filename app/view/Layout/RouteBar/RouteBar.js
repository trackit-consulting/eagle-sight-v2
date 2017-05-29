Ext.define('ES.view.Layout.RouteBar.RouteBar', {
    extend: 'Ext.grid.Panel',
    requires: ['Ext.window.Toast', 'ES.util.Helper.Colors'],
    alias: 'widget.routebar',
    title: 'RouteData',
    controller: 'routebar',
    viewModel: 'routebar',
    width: '100%',
    forceFit: true,
    header: false,
    store: {
        type: 'routedata'
    },
    viewConfig: {
        markDirty: false
    },
    columns: {
        border: false,
        defaults: {
            hoverCls: ''
        },
        items: [{
            text: locale.at,
            dataIndex: 'at',
            height: 45,
            align: 'center',
            style: {
                "background":ES.util.Helper.Colors.cellsBg,
                "color": ES.util.Helper.Colors.rowsTxtColor,
                "border-right": ES.util.Helper.Colors.borderclr,
            },
            renderer: function (value, metaData) {
                metaData.style = "background:" + ES.util.Helper.Colors.routeBarRows + "; border-right: 1px solid #c7c7c7; border-top: 1px solid #7c7c7c;";
                return value;
            },
            listeners: {
                //click: 'cellclick'
            }
        },
        /*
        {
            text: locale.countdown,
            dataIndex: 'countdown',
            height: 45,
            align: 'center',
            style: {
                "background-color": ES.util.Helper.Colors.routeBarHeader,
                "color": "white",
                "border-right": "1px solid #237263"
            },
            renderer: function (value, metaData) {
                var color = "#1b6053";

                metaData.style = "background-color:" + ES.util.Helper.Colors.routeBarRows + "; color: white;  border-right: 1px solid #33776a";
                return value;
            },
            listeners: {
                click: 'cellclick'
            }
        },
        */
        {
            text: locale.dkm,
            dataIndex: 'dkm',
            height: 45,
            align: 'center',
            style: {
                "background": ES.util.Helper.Colors.cellsBg,
                "color": ES.util.Helper.Colors.rowsTxtColor,
                "border-right": ES.util.Helper.Colors.borderclr
            },
            renderer: function (value, metaData) {
                var color = "#1b6053";

                metaData.style = "background:" + ES.util.Helper.Colors.routeBarRows + ";  border-right: 1px solid #c7c7c7; border-top: 1px solid #7c7c7c;";
                return value;
            },
            listeners: {
                //click: 'cellclick'
            }
        },
        {
            text: locale.vel,
            dataIndex: 'vel',
            height: 45,
            align: 'center',
            style: {
                "background": ES.util.Helper.Colors.cellsBg,
                "color": ES.util.Helper.Colors.rowsTxtColor,
                "border-right": ES.util.Helper.Colors.borderclr
            },
            renderer: function (value, metaData) {
                var color;
                if (value === locale.parked) {
                    color = ES.util.Helper.Colors.parkedclr;
                    ES.util.Helper.GlobalVars.countTime++;
                    var minutes = "0" + Math.floor(ES.util.Helper.GlobalVars.countTime / 60);
                    var seconds = "0" + (ES.util.Helper.GlobalVars.countTime - minutes * 60);
                    value = value + " (" + minutes.substr(-2) + ":" + seconds.substr(-2) + ")";
                } else {
                    color = ES.util.Helper.Colors.routeBarRows;
                    ES.util.Helper.GlobalVars.countTime = 0;
                }
                metaData.style = "background:" + color + "; border-right: 1px solid #c7c7c7; border-top: 1px solid #7c7c7c;";
                return value;
            },
            listeners: {
                //click: 'cellclick'
            }
        }
        /*,
        {
            text: locale.lp,
            dataIndex: 'lp',
            height: 45,
            align: 'center',
            style: {
                "background-color": ES.util.Helper.Colors.routeBarHeader,
                "color": "white",
                "border-right": "1px solid #237263"
            },
            renderer: function (value, metaData) {
                var color = "#1b6053";

                metaData.style = "background-color:" + color + "; color: white;  border-right: 1px solid #33776a";
                return value;
            },
            listeners: {
                click: 'cellclick'
            }
        }
        */
        ]
    }
});