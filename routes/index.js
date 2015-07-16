'use strict';
var user = require('../user').routes;
var featureRequest = require('../featureRequest').routes;
var bugReport = require('../bugReport').routes;

module.exports = function(routes){
    routes.get('/', function(req, res) {
        res.sendFile('C:\\Work\\Dot\\setup\\dot.jpg');
    });

    routes.get('/users', user.get);
    routes.get('/featureRequests', featureRequest.get);
    routes.get('/bugReports', bugReport.get);
};
