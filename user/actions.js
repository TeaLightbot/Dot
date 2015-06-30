var User = require('./model');

(function(actions){	
	actions.store = function(bot, from, to, text, split, sendTo){
		var user = new User({name: split.length > 0 ? split[1] : from});
		user.save(function(err){
			bot.emit('response', err || 'Saved new user: ' + user.name, sendTo);
		});		
	};
	
	actions.karma = function(user, plus){
		console.log("here", user)
		User.findOneAndUpdate({name: user}, { $inc: { karma: plus ? 1 : -1 }}).exec(); 
	};
})(module.exports)