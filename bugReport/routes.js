'use strict';
var BugReport = require('./model');

(function(bugReportRoutes) {
    bugReportRoutes.get = function(req, res) {
        BugReport.find().exec(function(err, results) {
            res.send(err || results);
        });
    };
})(module.exports);
