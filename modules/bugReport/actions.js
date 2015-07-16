'use strict';
var BugReport = require('./model');

(function(actions){
    actions.store = function(bot, from, to, text, split, sendTo) {
        var response = null;
        if(split.length === 1) {
            return "You haven't supplied a bug...";
        }
        var bugReport = new BugReport({
            bug: split.splice(1).join(' '),
            from: from
        });

        bugReport.save(function(err) {
            bot.emit('response', err || 'Your call is important to us, thank you for holding.', sendTo);
        });
	};

})(module.exports);
