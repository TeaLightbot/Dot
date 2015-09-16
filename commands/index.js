'use strict';
var helper         = require('../helper');
var user           = require('../modules/user').actions;
var featureRequest = require('../modules/featureRequest').actions;
var bugReport      = require('../modules/bugReport').actions;
var google         = require('../modules/google').actions;
var wikipedia      = require('../modules/wikipedia').actions;
var urban          = require('../modules/urban').actions;
var danger         = require('./dangerzone');
var roulette       = require('./roulette');
var colour = require('../colour');
var response = require('../responses').actions;
var config				 = require('../setup/config');

(function(commands){
	commands.hello = function(){
		return 'Hello';
	};

	commands.test = function(){
		var text = ['1', '-1', 'icles', colour.dance + ' tests'];
		return helper.choose(text);
	};

	commands.join = function(bot, from, to, text, split){
		bot.join(split[1]);
	};

	commands.part = function(bot, from, to, text, split){
		if (config.admin.indexOf(from) > -1){
			bot.part(split[1], '...');
		}
	};

	/* Module Commands */
	commands.g           = google.query;
	commands.gd          = google.queryDesc;
	commands.wik         = wikipedia.query;
	commands.ud          = urban.query;
	commands.ub          = urban.battle;
	commands.urban_reset = urban.reset;

	/* Core Commands */
	commands.karma       = user.karmaQuery;
	commands.leaderboard = user.leaderboard;
	commands.loserboard  = user.loserboard;
	commands.ben         = user.ben;
	commands.mal         = user.mal;
	commands.store       = user.store;
	commands.heed        = user.heed;
	commands.notHeed     = user.notHeed;
	commands.T           = user.T;
	commands.Ty          = user.Ty;
	commands.noT         = user.noT;
	commands.wfh         = user.wfh;
	commands.notWfh      = user.notWfh;
	commands.set         = response.store;
	commands.addKey      = response.addKey;
	commands.addResponse = response.addResponse;

	/* Stand Alones */
	commands.dangerzone = danger.zone;
	commands.roulette   = roulette.trigger;

	/* Maintenance Commands */
	commands.featureRequest  = featureRequest.store;
	commands.featureRequests = featureRequest.url;
	commands.bugReport       = bugReport.store;

})(module.exports);
