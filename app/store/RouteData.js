Ext.define('ES.store.RouteData', {
    extend: 'Ext.data.Store',
    alias: 'store.routedata',
    storeId: 'routedata',
    fields: [{
        name: 'at',
        type: 'string'
    }, {
        name: 'dkm',
        type: 'string'
    }, {
        name: 'vel',
        type: 'string'
    }, {
        name: 'countdown',
        type: 'string'
    },
    {
        name: 'lp',
        type: 'string'
    }],
    autoLoad: true,
    data: {
        storeId: 'routedata',
        query: [{
            at: '',
            dkm: '',
            vel: '',
            countdown: '',
            lp: ''
        }]
    },
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'query'
        }
    }
});