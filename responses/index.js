'use strict';
var user = require('../user').actions;

(function(responses){
	responses.parse = function(bot, from, split, sendTo){
		if (split[0] === '++'){
			user.karmaInc(from, split, true);
		} else if (split[0] === '--'){
			user.karmaInc(from, split, false);
		} else {
			return;
		}
	};
})(module.exports);
