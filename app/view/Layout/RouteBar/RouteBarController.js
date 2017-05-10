Ext.define('ES.view.Layout.RouteBar.RouteBarController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.routebar',
  cellclick: function (grid,td,cellIndex,record,tr,rowIndex,e,eOpts){

  var buildMessage = grid.panel.columns[0].text + ":";

    buildMessage += grid.panel.store.config.data.query[0].at + "<br><br>";
    buildMessage += grid.panel.columns[1].text + ":";
    buildMessage += grid.panel.store.config.data.query[0].countdown + "<br><br>";
    buildMessage += grid.panel.columns[2].text + ":";
    buildMessage += grid.panel.store.config.data.query[0].dkm + "<br><br>";
    buildMessage += grid.panel.columns[3].text + ":";
    buildMessage += grid.panel.store.config.data.query[0].vel + "<br><br>";
    buildMessage += grid.panel.columns[4].text + ":";
    buildMessage += localStorage.getItem("vhcLp");

    Ext.Msg.show({
        title:locale.info,
        msg: buildMessage,
        buttons: Ext.Msg.CANCEL,
        animateTarget: 'elId',
        icon: Ext.window.MessageBox.QUESTION
    });

  }
});