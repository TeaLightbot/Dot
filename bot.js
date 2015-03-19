// Create the configuration
var config = require("./config.json");

// Get the lib
var irc = require("irc");

// Create the bot name
var bot = new irc.Client(config.server, config.name, config);

/*bot.join('#dottest', function(err){
	console.log(err)
});*/

// Listen for joins
bot.addListener("join", function(channel, who) {
	// Welcome them in!
	if (who !== config.name){
		bot.say(channel, 'Hey, ' + who );
	} else {
		bot.say(channel, "...");
	}
});

// Listen for any message, PM said user when he posts
bot.addListener("message", function(from, to, text, message) {
	bot.say(from, "¿Que?");
});

// Listen for any message, say to him/her in the room
bot.addListener("message", function(from, to, text, message) {
	bot.say(config.channels[0], "¿Public que?");
});

bot.addListener('error', function(message) {
    console.log('error: ', message);
});