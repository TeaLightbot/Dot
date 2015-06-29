var config = require("./config.json");
var irc = require("irc");
var commands = require("./commands");
var helper = require("./helper");
var mongoCon = require("./mongoConnection").connect(config.db, config.dbName);

var express = require("express");
var app = express();
var setup = require("./setup/express")(app, config.secret);
var server = require("http").createServer(app);
var routes = require("./routes")(app);
server.listen(config.httpPort);

var bot = new irc.Client(config.server, config.name, config);

bot.addListener("join", function(channel, who) {
	var text = ['Hey, ', 'Howdy, ', 'Hi' ]
	if (who !== config.name){
		bot.say(channel, helper.choose(text) + who );
	} else {
		bot.say(channel, "...");
	}
});

bot.addListener("message", function(from, to, text, message) {
	console.log(message)
	var sendTo = from;
    if (to.indexOf('#') > -1) {
        sendTo = to;
    }
	var split = text.split(' ');
	if (split[0].charAt(0) === '.'){
		var command = split[0].split('.')[1];
		try{
			var resp = commands[command](bot, from, to, text, split);
			if(resp){
				bot.say(sendTo, resp);
			}
		} catch(err){
			console.log(err); 	
			bot.say(sendTo, 'Command not recognised');
		};
	}
});

bot.addListener('error', function(message) {
    console.log('error: ', message);
});