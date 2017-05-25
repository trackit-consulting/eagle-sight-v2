var config = require('./config/settings'),
    helper = require('./utilities/helper').Helper,
    WebSocketClient = require('websocket').client,
    WebSocketServer = require('websocket').server,
    serverLogger = require('./utilities/logger/server'),
    clientLogger = require('./utilities/logger/client'),
    http = require('http'),
    _ = require('underscore');

var util = require('util');
var client;
var toRetryConnect = false;
var eagles = [];

var MongoClient = require('mongodb').MongoClient;

var uriEs = util.format("mongodb://%s/eaglesightdb", config.mongo.local.host);
var uriMbi = util.format("mongodb://%s:%s/mbi", config.mongo.remote.host, config.mongo.remote.port);

console.log(uriEs);
/*
var urlEs = 'mongodb://localhost/eaglesightdb';
var urlMbi = 'mongodb://10.0.0.160:45555/mbi';
*/

var connectDbEs = MongoClient.connect(uriEs);
var connectDbMbi = MongoClient.connect(uriMbi);

var ObjectId = require('mongodb').ObjectID;

var ClientServer = function() {};

ClientServer.prototype.startClientServer = function(callback) {
    startClient(function() {
        startServer(function() {
            console.log("ClientServer is running");
        })
    })
};

function startClient(callback) {
    client = new WebSocketClient();

    client.on('connectFailed', function(error) {
        clientLogger.info('WebSocket ' + error.toString());
        if (!toRetryConnect) {
            toRetryConnect = true;
            setTimeout(function() {
                retryConnection(client);
            }, 10000);
        }
    });

    client.on('connect', function(connection) {
        clientLogger.info('WebSocket Client Connected');

        connection.send(JSON.stringify({
            type: 'auth',
            query: {
                user_id: -1,
                SESSID: helper.generateUUID()
            }
        }));

        connection.on('error', function(error) {
            clientLogger.info('WebSocket  ' + error.toString());
            setTimeout(function() {
                retryConnection(client);
            }, 3000);
        });

        connection.on('close', function() {
            clientLogger.info('WebSocket Connection Closed');
            setTimeout(function() {
                retryConnection(client);
            }, 3000);
        });

        connection.on('message', function(message) {
            if (message.type === 'utf8') {
                var data = JSON.parse(message.utf8Data);
                if (data.params.type == "records") {
                    if (data.params.lastRecord !== undefined) {
                        var record = data.params.lastRecord;
                        clientLogger.info("%j", record);
                        send(record.vid, message);
                    }
                }
            }
        });
        callback();
    });

    // connect to the server
    connect(client);

    function connect(client) {
        //retry connection
        var uri = util.format("ws://%s:%s/", config.socket.remote.host, config.socket.remote.port);
        clientLogger.info('WebSocket Server uri   : %s', uri);
        clientLogger.info('WebSocket Server domain: %s', config.socket.remote.domain);
        client.connect(uri, 'echo-protocol', config.socket.remote.domain);
    }

    function retryConnection(client) {
        try {
            client.abort();
        } catch (e) {}

        //reset flag
        toRetryConnect = false;

        //retry connection
        connect(client);
    }
}

//****************************************************/

function startServer(callback) {
    var server = http.createServer(function(request, response) {
        response.writeHead(404);
        response.end();
    });

    server.listen(8080, function() {
        serverLogger.info("Server is listening on port 8080");
        callback()
    });


    var wsServer = new WebSocketServer({
        httpServer: server,
        // You should not use autoAcceptConnections for production
        // applications, as it defeats all standard cross-origin protection
        // facilities built into the protocol and the browser.  You should
        // *always* verify the connection's origin and decide whether or not
        // to accept it.
        autoAcceptConnections: false
    });

    function originIsAllowed(origin) {
        // put logic here to detect whether the specified origin is allowed.
        return true;
    }

    wsServer.on('request', function(request) {
        if (!originIsAllowed(request.origin)) {
            // Make sure we only accept requests from an allowed origin
            request.reject();
            serverLogger.info('Connection Rejected %s', request.origin);
            return;
        }

        var connection = request.accept('echo-protocol', request.origin);
        serverLogger.info('Connection Accepted.');

        connection.on('message', function(message) {

            if (message.type === 'utf8') {
                var data = JSON.parse(message.utf8Data);
                switch (data.type) {
                    case "ping":
                        var pong = {};
                        pong.type = "pong";
                        connection.tmx = new Date();
                        connection.send(JSON.stringify(pong));
                        break;
                    case "auth":
                        serverLogger.info('Received Message: %j', data);
                        // Setting vid for connection
                        connection.vid = data.vid;
                        eagles.push(connection);
                        serverLogger.info('Total Clients: %j', eagles.length);
                        connectDbMbi.then(function(db) {
                            db.collection('mobile_info').findOne({
                                mid: data.vid
                            }, function(err, record) {
                                if (err) {
                                    console.log(err);
                                } else {
                                if(record === null){

                                }else{
                                var receiveLastData = JSON.stringify(record);
                                var lastDataObj = JSON.parse(receiveLastData);
                                var lastData =  {
                                    "params": {
                                        "lastRecord": {
                                            "vid": data.vid,
                                            "loc": {
                                                "lon": lastDataObj.pos.loc.lon,
                                                "lat": lastDataObj.pos.loc.lat
                                            },
                                            "gsp": lastDataObj.pos.gsp,
                                            "hdg": lastDataObj.pos.hdg
                                        }
                                    }
                                };
                                connection.send(JSON.stringify(lastData));
                            }
                                }

                            });
                        });
                        break;
                    case "token":
                        var token = {};
                        token.type = "token";
                        connectDbEs.then(function(db) {
                            db.collection('auth').findOne({
                                "_id": ObjectId(data.id)
                            }, function(err, record) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    if (record === null) {
                                        var notFound = {};
                                        notFound.type = "error";
                                        connection.send(JSON.stringify(notFound));
                                    } else {
                                        try {
                                            record.type = "token";
                                            connection.send(JSON.stringify(record));
                                            setHit(db, data.id, connection.remoteAddress);
                                        } catch (e) {
                                            console.log(e);
                                        }
                                    }
                                }
                            });
                        });

                        break;
                    default:
                }
            }
        });

        connection.on('close', function(reasonCode, description) {
            serverLogger.info('Connection Closed Peer %s', connection.remoteAddress);
            takeClientOff(connection);
        });
    });
}

function setHit(db, id, remoteAddress) {

    db.collection('auth').update({
        _id: ObjectId(id)
    }, {
        $set: {
            hit: [{
                date: new Date(Date.now()).toISOString(),
                ip: remoteAddress
            }]
        },


    }, {
        multi: true
    });
}

function send(vid, message) {

    var target = _.find(eagles, function(item) {
        return item.vid == vid;
    });

    if (target != undefined) {
        sendToClient(message, target);
    }
}

function sendToClient(message, sender) {
    eagles.forEach(function(eagle) {
        // Don't want to send it to sender
        if (eagle.vid === sender.vid) {
            eagle.sendUTF(message.utf8Data);
        }
    });
}

function takeClientOff(eagle) {
    eagles.splice(eagles.indexOf(eagle), 1);
}

exports.ClientServer = new ClientServer();