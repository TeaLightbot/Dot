'use strict';
var Help = require('./model');

(function(actions) {
    actions.store = function(bot, from, to, text, split, sendTo) {
        if(split.length === 1) {
            return "You haven't supplied any help...";
        }
        
        var parse = split.splice(1).join(' ').split(' | ');
        var help = new Help({
            command: parse[0],
            description: parse[1]
        });

        help.save(function(err) {
            bot.emit('response', err || parse[0] + ' saved!', sendTo);
        });
    };

    actions.get = function(bot, from, to, text, split, sendTo) {
        Help.findOne({command: split[1]}).exec(function(err, result){
            bot.emit('response', err || result ? result.description : "Command not recognised, try .list", sendTo);
        });
    };

})(module.exports);
