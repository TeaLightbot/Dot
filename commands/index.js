var helper = require("../helper");
var user = require("../user").commands;

(function(commands){
	commands.hello = function(){
		return "Hello"
	};
	
	commands.test = function(){
		var text = ["1", "-1", "icles"];
		return helper.choose(text);
	};
	
	commands.join = function(bot, from, to, text, split){
		bot.join(split[1]);		
	};
	
	commands.part = function(bot, from, to, text, split){
		bot.part(split[1], "...");		
	};
		
	commands.store = user.store;
})(module.exports)