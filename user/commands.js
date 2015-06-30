var User = require('./model');

(function(userCommands){	
	userCommands.store = function(bot, from, to, text, split, sendTo){
		var user = new User({name: split.length > 0 ? split[1] : from});
		user.save(function(err){
			bot.emit('response', err || 'Saved new user: ' + user.name, sendTo);
		});		
	};		
})(module.exports)