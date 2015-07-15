'use strict';
var User = require('./model');

(function(userRoutes){
	userRoutes.get = function(req, res){
		User.find().exec(function(err, results){
			res.send(err || results);
		});
	};
})(module.exports);
