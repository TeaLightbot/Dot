'use strict';
var User = require('./model');
var Thing = require('./thingModel');

(function(actions){
    actions.store = function(bot, from, to, text, split, sendTo){
    var user = new User({
      name: split.length > 1 ? split[1] : from
    });
    if(split.length > 2) {
      user.heed = split[2];
      user.tea = user.heed ? split[3] : false;
      user.wfh = user.heed ? split[4] : false;
    }
        user.save(function(err){
            bot.emit('response', err || 'Saved new user: ' + user.name, sendTo);
        });
    };

    var findReason = function(split) {
        split = split.splice(1).join(" ").split(" for ");
        return { name: split[0], reason: split.length > 1 ? split[1] : null };
    };

    actions.karmaInc = function(from, split, plus){
        var reasonSplit = findReason(split);
        var name = reasonSplit.name;
        var reason = reasonSplit.reason;
        if (plus && from === name){
            plus = false;
        }
        User.findOne({name: from}).exec(function(err, result){
            if (result && result.karma >= 0){
                User.findOneAndUpdate({ name: name }, { $inc: { karma: plus ? 1 : -1 } })
                .exec(function(err, result) {
                    if(!result) {
                        Thing.findOneAndUpdate({ name: name }, { $inc: { karma: plus ? 1 : -1 } })
                        .exec(function(err, result) {
                            if(!result) {
                                var thing = new Thing({
                                    name: name,
                                    karma: plus ? 1 : -1
                                });
                                thing.save();
                            }
                        });
                    }
                });
            }
        });
    };

    actions.karmaQuery = function(bot, from, to, text, split, sendTo) {
        var reasonSplit = findReason(split);
        var name = reasonSplit.name;
        var reason = reasonSplit.reason;
        User.findOne({ name: name || from }).exec(function(err, result) {
            if(result) {
                bot.emit('response', err || result.name + ': ' + result.karma, sendTo);
                return;
            }
            Thing.findOne({ name: name }).exec(function(err, result) {
                if(result) {
                    bot.emit('response', err || result.name + ': ' + result.karma, sendTo);
                    return;
                }
            });
        });
    };

    var employment = function(bot, from, sendTo, userList, value) {
      User.find({ heed: value }).exec(function(err, results) {
        var names = [];
        results.forEach(function(result) {
            if(result.name !== from && result.name in userList[sendTo]) {
                names.push(result.name);
            }
        });
          bot.emit('response', err || names.length > 0 ? '^^^ ' + names.join(', ') + ' ^^^' : 'They\'re all slacking...', sendTo);
      });
    };

    actions.heed = function(bot, from, to, text, split, sendTo, userList) {
        employment(bot, from, sendTo, userList, true);
    };

    actions.notHeed = function(bot, from, to, text, split, sendTo, userList) {
        employment(bot, from, sendTo, userList, false);
    };

    actions.T = function(bot, from, to, text, split, sendTo, userList) {
        User.find({ tea: true }, 'name').exec(function(err, results) {
            var names = [];
            var teaParty = false;
            results.forEach(function(result) {
                if(result.name !== from && result.name in userList[sendTo]) {
                    names.push(result.name);
                } else if(result.name === from) {
                    teaParty = true;
                }
            });
            bot.emit('response', err || !teaParty ? 'You\'re not invited to the tea party...' :
                names.length > 0 ? names.join(', ') + ': Tea/Coffee?' :
                'It\'s a long, solitary walk to the kitchen for you...', sendTo);
        });
    };

    var tea = function(bot, from, sendTo, value) {
    User.findOneAndUpdate({ name: from }, { tea: value }).exec(function(err, results) {
      bot.emit('response', err || from + ' ' + (value ? 'Adding you to tea list.' : 'Removing you from tea list.') , sendTo);
    });
    };

    actions.Ty = function(bot, from, to, text, split, sendTo) {
      tea(bot, from, sendTo, true);
    };

    actions.noT = function(bot, from, to, text, split, sendTo) {
      tea(bot, from, sendTo, false);
    };

    var home = function(bot, from, sendTo, value) {
    User.findOneAndUpdate({ name: from }, { wfh: value }).exec(function(err, results) {
      bot.emit('response', err || from + ' ' + (value ? 'Slacker.' : 'Planning to do some work today then?'), sendTo);
    });
    };

    actions.wfh = function(bot, from, to, text, split, sendTo) {
      tea(bot, from, sendTo, true);
    };

    actions.notWfh = function(bot, from, to, text, split, sendTo) {
      tea(bot, from, sendTo, false);
    };

})(module.exports);
