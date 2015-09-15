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
		    var regSplit = [];
		    split.forEach(function(key) {
		        var anKey = key.replace(/[^A-Za-z0-9]/g, '');

		        if(anKey && anKey.length > 1) {
		            regSplit.push(new RegExp(anKey));
		        }
		    });
		    console.log(regSplit);
		    Response.find({ 'key': { $in: regSplit } }).lean().exec(function(err, results) {
		        split = split.join(' ');
		        if(results.length === 1 && ~split.indexOf(results[0].key)) {
		            var resp = helper.choose(results[0].response);
		            bot.emit('response', err || resp, sendTo);
		        }
		    });
		}
	};

	responses.actions = require('./actions');
	responses.routes = require('./routes');
})(module.exports);
