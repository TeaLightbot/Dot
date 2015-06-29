(function(dataMapper) {
    "use strict";

    dataMapper.mongoose = require("mongoose");

    var Q = require("q"),
        logger = require("log4js").getLogger("mongoCon"),
        connectionHelper = require("./helper");

    dataMapper.connect = function(dbServer, dbName) {
        return connectionHelper.connect(dbServer, dbName);
    };

    dataMapper.disconnect = function() {
        return connectionHelper.disconnect();
    };

    dataMapper.findById = function(Model, id) {
        return Q.Promise(function(resolve, reject) {
            Model.findById(id, function(err, document) {
                if(err) {
                    logger.debug(err);
                    reject(err);
                } else {
                    resolve(document);
                }
            });
        });
    };

    dataMapper.find = function(specification) {
        return Q.Promise(function(resolve, reject) {
            var deferredQuery = specification.getModel().find({});
            specification.formQuery(deferredQuery);
            deferredQuery.exec(function(err, results) {
                if(err) {
                    logger.debug(err);
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    };

    dataMapper.findOne = function(specification) {
        return Q.Promise(function(resolve, reject) {
            var deferredQuery = specification.getModel().find({});
            specification.formQuery(deferredQuery);
            deferredQuery.findOne(function(err, result) {
                if(err) {
                    logger.debug(err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    };

    dataMapper.exists = function(specification) {
        return Q.Promise(function(resolve, reject) {
            var deferredQuery = specification.getModel().find({});
            specification.formQuery(deferredQuery);
            deferredQuery.count(function(err, count) {
                if(err) {
                    logger.debug(err);
                    reject(err);
                } else {
                    resolve(count > 0);
                }
            });
        });
    };

    dataMapper.save = function(document) {
        return Q.Promise(function(resolve, reject) {
            document.save(function(err, document) {
                if(err) {
                    logger.debug(err);
                    reject(err);
                } else {
                    resolve(document);
                }
            });
        });
    };

    dataMapper.update = function(document) {
        return Q.Promise(function(resolve, reject) {
            document.update(function(err, numUpdated) {
                if(err) {
                    logger.debug(err);
                    reject(err);
                } else {
                    resolve(document);
                }
            });
        });
    };

    dataMapper.remove = function(Model, document) {
        return Q.Promise(function(resolve, reject) {
            Model.findByIdAndRemove(document._doc._id, function(err, document) {
                if(err) {
                    logger.debug(err);
                    reject(err);
                } else {
                    resolve(document);
                }
            });
        });
    };
})(module.exports);
