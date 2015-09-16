'use strict';
var Response = require('./model');

(function(actions){
    actions.store = function(bot, from, to, text, split, sendTo) {
        var response = null;
        if(split.length === 1) {
            return "You haven't supplied a response...";
        }
        var parse = split.splice(1).join(' ').split(' | ');
        var responses = parse[1].split(' || ');
        var response = new Response({
            key: parse[0],
            response: responses
        });

        response.save(function(err) {
            bot.emit('response', err || parse[0] + ' saved!', sendTo);
        });
	};

    actions.addKey = function(bot, from, to, text, split, sendTo) {
        var response = null;
        if(split.length === 1) {
            return "You haven't supplied a key...";
        }
        var parse = split.splice(1).join(' ').split(' | ');
        Response.findOne({key: parse[0]}).exec(function(err, result) {
            result.key.push(parse[1]);
            result.save(function() {
                bot.emit('response', err || parse[0] + ' updated!', sendTo);
            });
        });
    };

    actions.addResponse = function(bot, from, to, text, split, sendTo) {
        var response = null;
        if(split.length === 1) {
            return "You haven't supplied a response...";
        }
        var parse = split.splice(1).join(' ').split(' | ');
        Response.findOne({ key: parse[0] }).exec(function(err, result) {
            result.response.push(parse[1]);
            result.save(function() {
                bot.emit('response', err || parse[0] + ' updated!', sendTo);
            });
        });
    };
})(module.exports);
