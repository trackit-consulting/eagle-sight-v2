var MongoClient = require('mongodb').MongoClient;
var config = require('../config/settings');
var util = require('util');

var uriEs = util.format("mongodb://%s:%s/dev", config.mongo.remote.host, config.mongo.remote.port);
var uriMbi = util.format("mongodb://%s:%s/mbi", config.mongo.remote.host, config.mongo.remote.port);

var ObjectId = require('mongodb').ObjectID;

var Data = function () { };

Data.prototype.getLastRecord = function (vid, callback) {
          console.log("vid: " + vid);
    var connectDbMbi = MongoClient.connect(uriMbi);
    connectDbMbi.then(function (db) {
        db.collection('mobile_info').findOne({mid: vid}, function (err, record) {
            if (err) {
                console.log("error: " + err);          
            } else {
                if (record === null) {
                console.log("mobile not found: " + vid);          
                } else {
                    callback(JSON.stringify(record.pos));
                }
            }

        });
        db.close();
    });
}

Data.prototype.getTokenValues = function (id, remoteAddress, callback) {
    var connectDbEs = MongoClient.connect(uriEs);
    //Receive data from the token Id
    connectDbEs.then(function (db) {
        db.collection('eaglesight').findOne({
            "_id": ObjectId(id)
        }, function (err, record) {
            if (err) {
                console.log(err);
            } else {
                if (record === null) {
                    var notFound = {};
                    notFound.type = "error";
                    callback(JSON.stringify(notFound));
                } else {
                    try {
                        record.type = "token";
                        callback(JSON.stringify(record));
                        db.collection('eaglesight').update({
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
                    } catch (e) {
                        console.log(e);
                    }
                }
            }
        });
    });
}

exports.Data = new Data();