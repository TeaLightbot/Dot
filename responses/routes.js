'use strict';
var Responses = require('./model');

(function(responseRoutes) {
    responseRoutes.get = function(req, res) {
        Responses.find().exec(function(err, results) {
            res.send(err || results);
        });
    };
})(module.exports);
