Ext.define('ES.view.Layout.Menu.MenuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.menu',
    requires: [
        'ES.util.Helper.Mobile',
        'ES.util.Helper.Timeline'
    ],
    onItemClick: function (grid, cellElement, rowIndex, cellIndex) {
        var gridstore = grid.getStore();
        if (ES.util.Helper.Mobile.isMobile()) {
            grid.up().collapse();
        }
        var rowdata = gridstore.data.items[rowIndex];
        ES.util.Helper.Timeline.showAddress(rowdata.data['lat'], rowdata.data['lng'], Ext.ComponentQuery.query('map')[0], false, null);
    }
});