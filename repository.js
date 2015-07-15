'use strict';
(function(repository) {
  repository.mongoose = require('mongoose');

  var Q = require('q');
  var logger = require('log4js').getLogger('mongoCon');
  var connectionHelper = require('./helper');

  repository.connect = function(dbServer, dbName) {
    return connectionHelper.connect(dbServer, dbName);
  };

  repository.disconnect = function() {
    return connectionHelper.disconnect();
  };

  repository.findById = function(Model, id) {
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

  repository.find = function(specification) {
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

  repository.findOne = function(specification) {
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

  repository.exists = function(specification) {
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

  repository.save = function(document) {
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

  repository.update = function(document) {
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

  repository.remove = function(Model, document) {
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
