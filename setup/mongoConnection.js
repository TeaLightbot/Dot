(function(dataMapperConnection) {
    "use strict";
	
    var mongoose = require("mongoose"),
        Q = require("q"),
        logger = require("log4js").getLogger("cqs-datamapper"),
        dbUri = null;

    function onMongooseConnection() {
        logger.info("Mongoose default connection open to " + dbUri);
    }

    function onMongooseError(err) {
        logger.info("Mongoose default connection error: " + err);
    }

    function onMongooseDisconnect() {
        logger.info("Mongoose default connection disconnected");
    }

    function registerConnectionEvents(dbUri) {
        mongoose.connection.on("connected", onMongooseConnection);
        mongoose.connection.on("error", onMongooseError);
        mongoose.connection.on("disconnected", onMongooseDisconnect);
    }

    function disconnectConnectionEvents() {
        mongoose.connection.removeListener("connected", onMongooseConnection);
        mongoose.connection.removeListener("error", onMongooseError);
        mongoose.connection.removeListener("disconnected", onMongooseDisconnect);
    }

    dataMapperConnection.connect = function(dbServer, dbName) {
        return Q.Promise(function(resolve, reject) {
            if(dbServer.indexOf("/", dbServer.length - 1) === -1) {
                dbServer = dbServer + "/";
            }

            dbUri = dbServer + dbName;
            registerConnectionEvents(dbUri);

            mongoose.connect(dbUri, null, function(err) {
                if(err) {
                    logger.debug(err);
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    };

    dataMapperConnection.disconnect = function() {
        disconnectConnectionEvents();
        return Q.Promise(function(resolve, reject) {
            mongoose.disconnect(function(err) {
                if(err) {
                    logger.debug(err);
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    };

})(module.exports);
