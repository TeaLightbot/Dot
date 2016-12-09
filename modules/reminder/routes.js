'use strict';
var FeatureRequest = require('./model');

(function(featureRequestRoutes){
    featureRequestRoutes.get = function(req, res) {
	    FeatureRequest.find().exec(function(err, results) {
			res.send(err || JSON.stringify(results, null, 2));
		});
	};
})(module.exports);
