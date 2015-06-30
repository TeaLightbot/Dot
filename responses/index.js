var helper = require("../helper");
var user = require("../user").actions;

(function(responses){
	responses.parse = function(split){
		if (split[0] === '++'){
			user.karma(split[1], true);
		} else if (split[0] === '--'){
			user.karma(split[1], false);
		} else {
			return;
		}
	};
})(module.exports)