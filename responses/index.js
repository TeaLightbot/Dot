'use strict';
var user = require('../modules/user').actions;
var Response = require('./model');
var helper = require('../helper');

(function(responses){
	responses.parse = function(bot, from, split, sendTo){
		if (split[0] === '++'){
			user.karmaInc(from, split, true);
		} else if (split[0] === '--'){
			user.karmaInc(from, split, false);
		} else {
		    Response.findOne({ "key": { $in: split }}).lean().exec(function(err, result) {
		        if(result) {
		            var resp = helper.choose(result.response);
		            bot.emit('response', err || resp, sendTo);
		        }
		    });
		}
	};

	responses.actions = require('./actions');
	responses.routes = require('./routes');
})(module.exports);
