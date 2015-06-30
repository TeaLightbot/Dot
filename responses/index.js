var helper = require("../helper");
var user = require("../user").actions;

(function(responses){
	responses.parse = function(bot, from, split, sendTo){
		if (split[0] === '++'){
			user.karma(from, split[1], true);
		} else if (split[0] === '--'){
			user.karma(from, split[1], false);
		} else {
			return;
		}
	};
})(module.exports)