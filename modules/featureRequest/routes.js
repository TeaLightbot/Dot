'use strict';
var FeatureRequest = require('./model');

(function(featureRequestRoutes){
    featureRequestRoutes.get = function(req, res) {
	    FeatureRequest.find().exec(function(err, results) {
			res.send(err || results);
		});
	};
})(module.exports);
