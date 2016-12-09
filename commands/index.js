'use strict';
var hotload        = require("hotload");
var helper         = hotload('../helper');
var user           = hotload('../modules/user').actions;
var featureRequest = hotload('../modules/featureRequest').actions;
var bugReport      = hotload('../modules/bugReport').actions;
var google         = hotload('../modules/google').actions;
var wikipedia      = hotload('../modules/wikipedia').actions;
var wolf           = hotload('../modules/wolframAlpha').actions;
var urban          = hotload('../modules/urban').actions;
var help           = hotload('../modules/help').actions;
var danger         = hotload('./dangerzone');
var roulette       = hotload('./roulette');
var colour         = hotload('../colour');
var response       = hotload('../responses').actions;
var https		   = require('https');
var config = require('../setup/config');

(function(commands){
	commands.hello = function(){
		return 'I don\'t like your face';
	};

	commands.c = function(bot, from, to, text, split) {
        
	    return eval(split.splice(1).join(""));
	}

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

	commands.cotw = function(bot, from, to, text, split) {
	    var joint = split.length > 1 ? split.splice(1).join(" ") : "Rainbow";
	    var response = "";
	    var colArr = [colour.red, colour.orange, colour.yellow, colour.green, colour.blue, colour.purple, colour.violet];
	    for(var i = 0; i < joint.length; i++) {
	        response += colArr[i % 7] + joint[i];
	    }
	    return response;
	}
	
	commands.shirShean = function(bot, from, to, text, split) {
	    var joint = split.length > 1 ? split.splice(1).join(" ") : "Here endeth the lesson";
	    return joint.replace(/s/gi, "sh");
	}
	
	commands.gotme = function() {
		var att = ['insufferable', 'beloved', 'overzealous', 'random', 'promiscuous', 'annoying', 'naked', 'scheming'];
		var title = ['king', 'guy with a beard', 'queen', 'hooker', 'squire', 'sorceress', '"who\'s that again?"', 'knight' ];
		var method = ['at a wedding', 'in battle', 'by decapitation', 'from poison', 'sort of', 'by burning alive', 'fighting dragons', 'just because'];
		return "You are the " + helper.choose(att) + " " + helper.choose(title) + " that dies " + helper.choose(method);
	}
	
	commands.msg = function(bot, from, to, text, split) {
		if (from === "Lightbot"){
			var joint = split.splice(2).join(" ");
			bot.emit('response', joint, split[1]);
		}
	}
	
	commands.hackIdea = function(bot, from) {
		if(from === "Dan"){
			return "No, that's stupid.";
		}
		return helper.choose(["That could work", "Seems reasonable", "Sounds interesting"]);
	}

	commands.list = function(bot, from) {
	    bot.emit('response', Object.keys(commands).join(', '), from);
	}
	
	commands.eloWin = function(bot, from, to, text, split) {
		console.log(split[1])
		console.log(split[2])
		var higher = parseInt(split[1]);
		var lower = parseInt(split[2]);
		var diff = lower - higher;
		console.log(diff)
		var power = diff/400;
		console.log(power)
		var tenPower = Math.pow(10,power);
		console.log(tenPower);
		var prob = 1/(1+tenPower);
		console.log(prob);
		return (prob * 100).toFixed(2) + "% chance of winning";
	}
	
	commands.pool = function(bot, from, to, text, split, sendTo) {
		var options = {
            host: "poolcue.xyz",
            path: "/api/players"
        };
		var response = "";
		var callback = function(res) {
        res.on("error", function(err) {
            console.log(err);
        });
		res.on("data", function(chunk){
			response += chunk;
		});
		res.on("end", function(){
			console.log(response)
			var json = JSON.parse(response);
			var result = "";
			console.log(split)
			var joint = split.splice(1).join(" ");
			var i = 1;
			console.log(joint)
			if (joint.length == 0){
				json = json.slice(0,5);
				json.forEach(function(player){
					result+= '#' + i++ + ' - ' + player.name + ' : ' +  player.elo + '\n';
				});
			} else {
				json.forEach(function(player){
					if (player.name.toLowerCase() == joint.toLowerCase()){
						result+= '#' + i + ' - ' + player.name + ' : ' +  player.elo + '\n';
					}
					i++;
				});
				if (result.length == 0){
					result = "No player found with that name";
				}
			}			
			
			bot.emit('response', result, sendTo);
		});
		}
		
		https.request(options, callback).end();
	};

	/* Module Commands */
	//commands.g           = google.query;
	commands.gd          = google.queryDesc;
	commands.wik         = wikipedia.query;
	commands.wa          = wolf.query;
	commands.ud          = urban.query;
	commands.ub          = urban.battle;
	commands.urban_reset = urban.reset;

	/* Core Commands */
	commands.karma       = user.karmaQuery;
	commands.reasons     = user.reasons;
	commands.leaderboard = user.leaderboard;
	commands.loserboard  = user.loserboard;
	commands.ben         = user.ben;
	commands.mal         = user.mal;
	commands.store       = user.store;
	commands.purps        = user.purps;
	commands.notPurps     = user.notPurps;
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
	commands.dangerzone   = danger.zone;
	commands.roulette     = roulette.trigger;
	commands.rouletteSpin = roulette.spin;

	/* Maintenance Commands */
	commands.featureRequest  = featureRequest.store;
	commands.featureRequests = featureRequest.url;
	commands.bugReport       = bugReport.store;

})(module.exports);
