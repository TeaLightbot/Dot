var user = require('../user').routes;

module.exports = function(routes){
    routes.get('/', function(req, res) {
        res.sendFile('C:\\Work\\Dot\\setup\\dot.jpg');
	});
	
	routes.get('/users', user.get);		
};