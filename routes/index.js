'use strict';
var user = require('../modules/user').routes;
var featureRequest = require('../modules/featureRequest').routes;
var bugReport = require('../modules/bugReport').routes;

module.exports = function(routes){
    routes.get('/', function(req, res) {
        res.sendFile('C:\\Work\\Dot\\setup\\dot.jpg');
    });

    routes.get('/users', user.get);
    routes.get('/featureRequests', featureRequest.get);
    routes.get('/bugReports', bugReport.get);
};
