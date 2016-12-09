'use strict';
var User = require('./model');
var KarmaLog = require('./karmaLogModel');

(function(userRoutes){
	userRoutes.get = function(req, res){
		User.find().exec(function(err, results){
			res.send(err || results);
		});
	};
	
	userRoutes.getKarma = function(req, res){
		if (req && req.query && req.query.taker){
			KarmaLog.find({ taker: req.query.taker, reason: { $exists: true, $nin: [null, ""] } }).exec(function(err, results){
				res.send(err || results);
			});
		}
	};
})(module.exports);

