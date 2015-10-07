'use strict';
var Help = require('./model');

(function(help) {
    help.get = function(req, res) {
        Help.find().exec(function(err, results) {
            res.send(err || results);
        });
    };
})(module.exports);
