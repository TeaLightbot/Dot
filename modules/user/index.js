'use strict';
var hotload = require('hotload');
(function(user){
	user.actions = hotload('./actions');
	user.routes = hotload('./routes');
})(module.exports);
