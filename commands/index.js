'use strict';
var hotload        = require("hotload");
var helper         = hotload('../helper');
var user           = hotload('../modules/user').actions;
var featureRequest = hotload('../modules/featureRequest').actions;
var bugReport      = hotload('../modules/bugReport').actions;
var google         = hotload('../modules/google').actions;
var wikipedia      = hotload('../modules/wikipedia').actions;
var urban          = hotload('../modules/urban').actions;
var help           = hotload('../modules/help').actions;
var danger         = hotload('./dangerzone');
var roulette       = hotload('./roulette');
var colour         = hotload('../colour');
var response       = hotload('../responses').actions;
var config         = require('../setup/config');

(function(commands){
	commands.hello = function(){
		return 'I don\'t like your face';
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

	commands.list = function(bot, from) {
	    bot.emit('response', Object.keys(commands).join(', '), from);
	}

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
	commands.help        = help.get;
	commands.addHelp     = help.store;

	/* Stand Alones */
	commands.dangerzone = danger.zone;
	commands.roulette   = roulette.trigger;

	/* Maintenance Commands */
	commands.featureRequest  = featureRequest.store;
	commands.featureRequests = featureRequest.url;
	commands.bugReport       = bugReport.store;

})(module.exports);
