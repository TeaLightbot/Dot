'use strict';
var user = require('../modules/user').routes;
var featureRequest = require('../modules/featureRequest').routes;
var bugReport = require('../modules/bugReport').routes;
var inventories = require('../modules/inventory').routes;
var responses = require('../responses').routes;
var express = require('express');

module.exports = function(routes){
     routes.use(express.static("./routes/dist")).get("/", function (req, resp) {
        resp.sendFile("index.html", { root: "./routes/dist" });
     });
	
};
