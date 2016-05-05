'use strict';
var user = require('../modules/user').actions;
var Response = require('./model');
var helper = require('../helper');

(function(responses){
    responses.parse = function(bot, from, split, sendTo){
        if (split[0] === '++'){
            user.karmaInc(from, split, true);
        } else if(split[0] === '--') {
            if(split[1] == "Dot") {
                var fuck = helper.choose(['off', 'you', 'donut', 'shakespeare', 'linus', 'king', 'chainsaw', 'outside', 'madison', 'nugget', 'yoda', 'bus', 'shutup'])
                bot.emit('response', 'https://foaas.com/' + fuck + '/' + from +'/Dot', sendTo);
            }
            user.karmaInc(from, split, false);
        } else if (split[0] === 'Gimme' && (split[1] === 'a' || split[1] === 'an')){
            return split.splice(2).join(' ');
        } else {
            var regSplit = [];
            split.forEach(function(key) {
                var anKey = key.replace(/[^A-Za-z0-9]/g, '');

                if(anKey && anKey.length > 1) {
                    regSplit.push(new RegExp(anKey));
                }
            });

            Response.find({ 'key': { $in: regSplit } }).lean().exec(function(err, results) {
                var match = {};
                if(results && fullKey(split.join(' '), results, match)) {
                    var resp = helper.choose(match.response);
                    bot.emit('response', err || resp, sendTo);
                }
            });
        }
    }

    var fullKey = function(split, results, match) {
        var isPresent = false;
        results.forEach(function(result) {
            result.key.forEach(function(key) {
                if(~split.indexOf(key)) {
                    match.response = result.response;
                    isPresent = true;
                }
            });
        });
        return isPresent;
    }

    responses.actions = require('./actions');
    responses.routes = require('./routes');
})(module.exports);
