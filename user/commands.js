var User = require("./model");

(function(userCommands){	
	userCommands.store = function(bot, from, to, text, split){
		var user = new User({name: split.length > 0 ? split[1] : from});
		user.save(function(err){
			if(err){ return err; }
			return 'Saved new user: ' + user.name;
		});		
	};		
})(module.exports)