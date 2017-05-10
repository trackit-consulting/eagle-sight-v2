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
    bodyStyle: 'background: ' + ES.util.Helper.Colors.timelineBg + ';',
    autoHeight: true,
    store: {
        type: 'timeline'
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
            height: 60,
            style: {
                "background-color": ES.util.Helper.Colors.timelineRow,
                "color": ES.util.Helper.Colors.rowsTxtColor
            },
            renderer: function (value, metaData) {
                metaData.style = "background-color:#136051; color: white; outline: 1px solid white; padding:20px;";
                return value;
            }
        },
        {
            text: locale.address,
            dataIndex: 'address',
            id: 'addressBtn',
            flex: 1,
            align: 'center',
            height: 60,
            style: {
                "background-color": ES.util.Helper.Colors.timelineRowShow,
                "color": ES.util.Helper.Colors.rowsTxtColor,
                "outline": "1px solid #2b5876"
            },
            renderer: function (value, metaData) {
                metaData.style = "background-color:#0d342c; color: " + ES.util.Helper.Colors.rowsTxtColor + "; outline: 1px solid white; padding:20px";
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
            height: 60,
            style: {
                "background-color": ES.util.Helper.Colors.timelineRow,
                "color": ES.util.Helper.Colors.rowsTxtColor,
                "outline": "1px solid #2b5876"
            },
            renderer: function (value, metaData, record) {
                metaData.style = "background-color:#136051; color: " + ES.util.Helper.Colors.rowsTxtColor + "; outline: 1px solid white; padding: 20px;";
                switch (value) {
                    case 'N':
                        return '<img width="13" height="13" src="resources/directions/north.png" />';
                        break;
                    case 'S':
                        return '<img width="13" height="13" src="resources/directions/south.png" />';
                        break;
                    case 'W':
                        return '<img width="13" height="13" src="resources/directions/west.png" />';
                        break;
                    case 'E':
                        return '<img width="13" height="13" src="resources/directions/east.png" />';
                        break;
                    case 'NE':
                        return '<img width="13" height="13" src="resources/directions/northeast.png" />';
                        break;
                    case 'NW':
                        return '<img width="13" height="13" src="resources/directions/northwest.png" />';
                        break;
                    case 'SW':
                        return '<img width="13" height="13" src="resources/directions/southwest.png" />';
                        break;
                    case 'SE':
                        return '<img width="13" height="13" src="resources/directions/southeast.png" />';
                        break;
                    case 'NNE':
                        return '<img width="13" height="13" src="resources/directions/northeast.png" />';
                        break;
                    case 'ENE':
                        return '<img width="13" height="13" src="resources/directions/northeast.png" />';
                        break;
                    case 'WNW':
                        return '<img width="13" height="13" src="resources/directions/northwest.png" />';
                        break;
                    case 'NNW':
                        return '<img width="13" height="13" src="resources/directions/northwest.png" />';
                        break;
                    case 'SSW':
                        return '<img width="13" height="13" src="resources/directions/southwest.png" />';
                        break;
                    case 'WSW':
                        return '<img width="13" height="13" src="resources/directions/southwest.png" />';
                        break;
                    case 'SSE':
                        return '<img width="13" height="13" src="resources/directions/southeast.png" />';
                        break;
                    case 'ESE':
                        return '<img width="13" height="13" src="resources/directions/southeast.png" />';
                    default:
                        return '<img width="13" height="13" src="resources/directions/north.png" />';
                }
            }
        }
        ]
    }
});