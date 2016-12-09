'use strict';
var config         = require('./setup/config.json');
var irc            = require('irc');
var hotload        = require('hotload');
var commands       = hotload('./commands');
var responses      = hotload('./responses');
var reminders      = hotload('./modules/reminder');
var helper         = hotload('./helper');
var mongoCon       = require('./setup/mongoConnection').connect(config.db, config.dbName);
var Q              = require('q');
var express        = require('express');
var app            = express();
var setup          = require('./setup/express')(app, config.secret);
var server         = require('http').createServer(app);
var routes         = require('./routes')(app);
var twitterStreams = require('./modules/twitterStreams/');
server.listen(config.httpPort);

var bot = new irc.Client(config.server, config.name, config);

var userList = {};
var previousMessage = [""];
var previousCommand = [""];

var count = 1;
var quiet = {};
var timeout = null;
function reminder(){
	reminders.actions.check(bot);
}

setInterval(reminder, 30000);

function vocal(channel){
	quiet[channel] = false;
	bot.say(channel, '...');
}

bot.on('join', function(channel, who) {
	var text = ['Hey, ', 'Howdy, ', 'Hi, ', 'Greetings, '];
	if (who !== config.name){
		//bot.say(channel, helper.choose(text) + who );
	} else {
		bot.say(channel, '...');
	}
});

bot.on('message', function(from, to, text, message) {
	console.log(message);
	var sendTo = from;
    if (to.indexOf('#') > -1) {
      sendTo = to;
    }
	if (from === 'SeniorDaniel' && count % 57 == 0){
		count++;
		var faust = ['https://en.wikipedia.org/wiki/Deal_with_the_Devil', "All words, thoughts and opinions expressed by Dan Morrison™ are sole property of Lockheed Martin", "https://open.spotify.com/track/57CXhuTXrLqxXKgLC7UA1s"];
		bot.say(sendTo, helper.choose(faust));
	}
	var split = text.split(' ');
	var resp = null;
	if (split[0].charAt(0) === '.'){
		var command = split[0].split('.')[1];
		if (command === 'quiet'){
			quiet[sendTo] = true;
			timeout = setTimeout(vocal, 600000, sendTo);
			resp = "Shutting up.";
		} else if(command === 'vocal' && timeout){
			quiet[sendTo] = false;
			clearTimeout(timeout);
		} else {
			try{
				resp = commands[command](bot, from, to, text, split, sendTo, userList);
				previousCommand = [command];
			} catch(err){
				if (!quiet[sendTo]){
					resp = responses.parse(bot, from, split, sendTo);
				}
			}
		}
	} else if (!quiet[sendTo]){
		resp = responses.parse(bot, from, split, sendTo);
	}
	if(resp){
		bot.say(sendTo, resp);
	}
});

bot.on('response', function(resp, sendTo) {
    if(typeof resp === 'string') {
        resp = [resp];
    }
	if (previousMessage[0] !== resp[0] || previousCommand[0] === "ud" || previousCommand[0] === "list" || previousCommand[0] === "pool"){
		previousCommand[0] = "";
		previousMessage[0] = resp[0];
		resp.forEach(function(string) {
			bot.say(sendTo, string);
		});
	};
});

bot.on('names', function(channel, nicks) {
    userList[channel] = nicks;
    console.log(userList);
    twitterStreams.query(bot);
});

bot.on('error', function(message) {
    console.log('error: ', message);
});
