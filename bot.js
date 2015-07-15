'use strict';
var config    = require('./setup/config.json');
var irc       = require('irc');
var commands  = require('./commands');
var responses = require('./responses');
var helper    = require('./helper');
var mongoCon  = require('./setup/mongoConnection').connect(config.db, config.dbName);
var Q         = require('q');
var express   = require('express');
var app       = express();
var setup     = require('./setup/express')(app, config.secret);
var server    = require('http').createServer(app);
var routes    = require('./routes')(app);
server.listen(config.httpPort);

var bot = new irc.Client(config.server, config.name, config);

var userList = {};

bot.on('join', function(channel, who) {
	var text = ['Hey, ', 'Howdy, ', 'Hi, '];
	if (who !== config.name){
		bot.say(channel, helper.choose(text) + who );
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
	var split = text.split(' ');
	var resp = null;
	if (split[0].charAt(0) === '.'){
		var command = split[0].split('.')[1];
		try{
			resp = commands[command](bot, from, to, text, split, sendTo, userList);
		} catch(err){
			console.log(err);
			resp = 'Command not recognised';
		}
	} else {
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
    resp.forEach(function(string) {
        bot.say(sendTo, string);
    });
});

bot.on('names', function(channel, nicks) {
    userList[channel] = nicks;
    console.log(userList);
});

bot.on('error', function(message) {
    console.log('error: ', message);
});
