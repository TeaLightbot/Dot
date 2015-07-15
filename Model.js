'use strict';
var config = require('./config.json');
var irc = require('irc');
var commands = require('./commands');

// Create the bot name
var bot = new irc.Client(config.server, config.name, config);

/*bot.join('#dottest', function(err){
	console.log(err)
});*/

// Listen for joins
bot.addListener('join', function(channel, who) {
	// Welcome them in!
	if (who !== config.name){
		bot.say(channel, 'Hey, ' + who );
	} else {
		bot.say(channel, '...');
	}
});

// Listen for any message, PM said user when he posts
bot.addListener('message', function(from, to, text, message) {
	console.log(message);
	var split = text.split(' ');
	console.log(split);
	if (split[0].charAt(0) === '.'){
		var command = split[0].split('.')[1];
		console.log(command);
		bot.say(from, commands[command](from, to, text, message));
	}
});

// Listen for any message, say to him/her in the room
bot.addListener('message', function(from, to, text, message) {
	bot.say(config.channels[0], '.');
});

bot.addListener('error', function(message) {
  console.log('error: ', message);
});

var fs = require('fs');

var processor = function (client, from, to, text, message) {
	if (text && text.length > 2 && text[0] === '.') {
		var sendTo = from; // send privately
		if (to.indexOf('#') > -1) {
		  sendTo = to; // send publicly
		}

		var action = String(text.split(' ')[0]).replace('.', '');
		if (fs.existsSync('/commands/' + action + '.js')) { // check if we have an action file
		  var actionFunc = require('/commands/' + action + '.js');
		  var output = actionFunc(client, from, to, text, message);
		  if (output) {
		      client.say(sendTo, output);
		  }
		} else {
	  client.say(sendTo, 'unknown action');
		}
	}
};

client.addListener('message', function (from, to, text, message) {
    processor(client, from, to, text, message);
});
