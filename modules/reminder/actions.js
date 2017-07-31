'use strict';
var Reminder = require('./model');
var os             = require("os");
var config         = require('../../setup/config.json');
var util           = require("util");

(function(actions){
    actions.store = function(bot, from, split, sendTo) {
        var response = null;
        if(split.length === 3) {
            return "You haven't supplied a message...";
        }
		var joint = split.splice(3).join(' ');
		split = joint.split(' in ');
		if (split.length < 2) {
			return '' + from + ': ' + split[0];
		}
		var timing = split[1].split(' ');
		var time = new Date();
		var inc = parseInt(timing[0])
		
		switch(timing[1]){
			case 'day':
			case 'days':
				time.setDate(time.getDate() + inc);
				break;
			case 'hour':
			case 'hours':
				time.setHours(time.getHours() + inc);
				break;
			case 'minute':
			case 'minutes':
				time.setMinutes(time.getMinutes() + inc);
				break;
			default: 
				return '' + from + ': ' + split[0];				
		}
			
        var reminder = new Reminder({
            message: split[0],
            from: from,
			sendTo: sendTo,
			date: time
        });

        reminder.save();
		
		return 'Okay, ' + from + ", I'll remind you.";
	};
	
	actions.storeCommand = function(bot, from, split, sendTo) {
        var response = null;
        if(split.length === 2) {
            return "You haven't supplied a message...";
        }
		var joint = split.splice(2).join(' ');
		split = joint.split(' in ');
		if (split.length < 2) {
			return;
		}
		if (split[0].charAt(0) !== '.'){
			return "No valid command given."
		}
		var timing = split[1].split(' ');
		var time = new Date();
		var inc = parseInt(timing[0])
		
		switch(timing[1]){
			case 'day':
			case 'days':
				time.setDate(time.getDate() + inc);
				break;
			case 'hour':
			case 'hours':
				time.setHours(time.getHours() + inc);
				break;
			case 'minute':
			case 'minutes':
				time.setMinutes(time.getMinutes() + inc);
				break;
			default: 
				return;				
		}
			
        var reminder = new Reminder({
            command: split[0],
            from: from,
			to: sendTo,
			sendTo: sendTo,
			date: time
        });

        reminder.save();
		
		return 'Okay, ' + from + ", I'll do that.";
	};
	
	actions.check = function(bot){
		Reminder.find({ sent: false, date: { $lt: new Date() } })
            .exec(function(err, results) {
                if(results && results.length) {
					results.forEach(function(result){
						if(result.message) { 
							bot.emit('response', result.from + ': ' + result.message , result.sendTo);
						} else {
							bot.emit('command', result);
						}
						result.sent = true;
						result.save();
					});
                }
            });
	}


})(module.exports);
