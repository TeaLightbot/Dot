var User = require('./model');

(function(actions){
	actions.store = function(bot, from, to, text, split, sendTo){
	    var user = new User({
	        name: split.length > 1 ? split[1] : from
	    });
	    if(split.length > 2) {
	        user.heed = split[2];
	        user.tea = user.heed ? split[3] : false;
	        user.wfh = user.heed ? split[4] : false;
	    }
		user.save(function(err){
			bot.emit('response', err || 'Saved new user: ' + user.name, sendTo);
		});
	};

	actions.karma = function(from, user, plus){
		if (plus && from === user){
			plus = false;
		}
		User.findOne({name: from}).exec(function(err, result){
			if (result && result.karma >= 0){
				User.findOneAndUpdate({name: user}, { $inc: { karma: plus ? 1 : -1 }}).exec();
			}
		});
	};

	var employment = function(bot, sendTo, value) {
	    User.find({ heed: value }).exec(function(err, results) {
	        var names = [];
	        results.forEach(function(result) {
	            names.push(result.name);
	        });
	        bot.emit('response', err || '^^^ ' + names.join(", ") + ' ^^^', sendTo);
	    });
	};

	actions.heed = function(bot, from, to, text, split, sendTo) {
	    employment(bot, sendTo, true);
	};

	actions.notHeed = function(bot, from, to, text, split, sendTo) {
	    employment(bot, sendTo, false);
	};

	actions.T = function(bot, from, to, text, split, sendTo) {
	    User.find({ tea: true }, "name").exec(function(err, results) {
	        var names = [];
	        results.forEach(function(result) {
	            names.push(result.name);
	        });
	        bot.emit('response', err || names.join(", ") + ': Tea/Coffee?', sendTo);
	    });
	};

	var tea = function(bot, from, sendTo, value) {
	    User.findOneAndUpdate({ name: from }, { tea: value }).exec(function(err, results) {
	        bot.emit('response', err || from + " " + (value ? 'Adding you to tea list.' : 'Removing you from tea list.') , sendTo);
	    });
	};

	actions.Ty = function(bot, from, to, text, split, sendTo) {
	    tea(bot, from, sendTo, true);
	};

	actions.noT = function(bot, from, to, text, split, sendTo) {
	    tea(bot, from, sendTo, false);
	};

	var home = function(bot, from, sendTo, value) {
	    User.findOneAndUpdate({ name: from }, { wfh: value }).exec(function(err, results) {
	        bot.emit('response', err || from + " " + (value ? 'Slacker.' : 'Planning to do some work today then?'), sendTo);
	    });
	};

	actions.wfh = function(bot, from, to, text, split, sendTo) {
	    tea(bot, from, sendTo, true);
	};

	actions.notWfh = function(bot, from, to, text, split, sendTo) {
	    tea(bot, from, sendTo, false);
	};

})(module.exports);
