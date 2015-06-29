var user = require('../user/model');

module.exports = function(routes){
	routes.get('/', function(req, res){
		res.send('...');
	});		
	
	routes.get('/users', function(req, res){
		user.find().exec(function(err, results){
			res.send(err || results);
		});
	});		
};