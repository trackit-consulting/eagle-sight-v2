Ext.define('ES.view.Layout.Menu.Menu', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.timelineBar',
    requires: ['ES.util.Helper.Colors'],
    controller: 'menu',
    viewModel: 'menu',
    overflowY: 'auto',
    id: 'timelineBar',
    autoScroll: true,
    title: 'Timeline',
    autoHeight: true,
    store: {
        type: 'timeline'
    },
    border: 1,
    style: {
       borderColor: 'black',
       borderStyle: 'solid'
    },
    columns: {
        border: false,
        defaults: {
            hoverCls: ''
        },
        items: [{
            text: locale.time,
            flex: 1,
            dataIndex: 'time',
            align: 'center',
            height: 50,
            style: {
                "background":ES.util.Helper.Colors.cellsBg,
                "color": ES.util.Helper.Colors.rowsTxtColor
            },
            renderer: function (value, metaData) {
                metaData.style = "color:" +  ES.util.Helper.Colors.rowsTxtColor + "; outline: 1px solid white; padding:20px;";
                return value;
            }
        },
        {
            text: locale.address,
            dataIndex: 'address',
            id: 'addressBtn',
            flex: 1,
            align: 'center',
            height: 50,
            style: {
                "background":ES.util.Helper.Colors.cellsBg,
                "color": ES.util.Helper.Colors.rowsTxtColor,
                "outline": ES.util.Helper.Colors.borderclr
            },
            renderer: function (value, metaData) {
                metaData.style = "background:#d3d3d3; color : #000000; padding:20px";
                return value;
            },
            listeners: {
                click: 'onItemClick'
            }
        },
        {
            text: locale.dir,
            dataIndex: 'dir',
            flex: 1,
            align: 'center',
            height: 50,
            style: {
                "background": ES.util.Helper.Colors.cellsBg,
                "color": ES.util.Helper.Colors.rowsTxtColor,
                "outline": ES.util.Helper.Colors.borderclr
            },
            renderer: function (value, metaData, record) {
                metaData.style = "color: " + ES.util.Helper.Colors.rowsTxtColor + "; padding: 20px;";
                switch (value) {
                    case 'N':
                        return '<img width="15" height="15" src="resources/directions/north_1.png" />';
                        break;
                    case 'S':
                        return '<img width="15" height="15" src="resources/directions/south_1.png" />';
                        break;
                    case 'W':
                        return '<img width="15" height="15" src="resources/directions/west_1.png" />';
                        break;
                    case 'E':
                        return '<img width="15" height="15" src="resources/directions/east_1.png" />';
                        break;
                    case 'NE':
                        return '<img width="15" height="15" src="resources/directions/northeast_1.png" />';
                        break;
                    case 'NW':
                        return '<img width="15" height="15" src="resources/directions/northwest_1.png" />';
                        break;
                    case 'SW':
                        return '<img width="15" height="15" src="resources/directions/southwest_1.png" />';
                        break;
                    case 'SE':
                        return '<img width="15" height="15" src="resources/directions/southeast_1.png" />';
                        break;
                    case 'NNE':
                        return '<img width="15" height="15" src="resources/directions/northeast_1.png" />';
                        break;
                    case 'ENE':
                        return '<img width="15" height="15" src="resources/directions/northeast_1.png" />';
                        break;
                    case 'WNW':
                        return '<img width="15" height="15" src="resources/directions/northwest_1.png" />';
                        break;
                    case 'NNW':
                        return '<img width="15" height="15" src="resources/directions/northwest_1.png" />';
                        break;
                    case 'SSW':
                        return '<img width="15" height="15" src="resources/directions/southwest_1.png" />';
                        break;
                    case 'WSW':
                        return '<img width="15" height="15" src="resources/directions/southwest_1.png" />';
                        break;
                    case 'SSE':
                        return '<img width="15" height="15" src="resources/directions/southeast_1.png" />';
                        break;
                    case 'ESE':
                        return '<img width="15" height="15" src="resources/directions/southeast_1.png" />';
                    default:
                        return '<img width="15" height="15" src="resources/directions/north_1.png" />';
                }
            }
        }
        ]
    }
});