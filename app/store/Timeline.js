Ext.define('ES.store.Timeline', {
    extend: 'Ext.data.Store',
    alias: 'store.timeline',
    requires: ['Ext.data.proxy.SessionStorage'],
    storeId: 'timeline',
    fields: [{
        name: 'vid',
        type: 'int'
    }, {
        name: 'time',
        type: 'string'
    }, {
        name: 'lat',
        type: 'float'
    }, {
        name: 'lng',
        type: 'float'
    }, {
        name: 'address',
        type: 'string'
    }, {
        name: 'dir',
        type: 'string'
    }, {
        name: 'vel',
        type: 'string'
    }, 'hidden'],
    pageSize: 500,
    autoSync: true,
    sorters: [{
        property: 'time',
        direction: 'DESC'
    }],
    data: {
        query: []
    },
    proxy: {
        type: 'sessionstorage',
        id: 'sessionTimeline',
        reader: {
            type: 'json',
            rootProperty: 'query'
        }
    },
    filters: [{
        property: 'hidden',
        value: false
    }]
});