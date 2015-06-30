var helper = require("../helper");
var user = require("../user").commands;

(function(responses){
	responses.parse = function(split){
		if (split[0] === '++'){
			return 'plusplus';
		} else if (split[0] === '--'){
			return 'minusminus';
		} else {
			return;
		}
	};
})(module.exports)