'use strict';
var helper =    require("../../helper");
var User =      require('./model');
var Thing =     require('./thingModel');
var KarmaLog =  require('./karmaLogModel');

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

    actions.karmaInc = function(from, split, plus) {
        var user = split[1];
        var userReason = split.slice(2).join(" ");
        console.log(userReason);
        var reasonSplit = findReason(split);
        var name = reasonSplit.name;
        
        if (plus && from === user){
            plus = false;
        }

        var karmaLog = new KarmaLog({
            giver: from,
            taker: name,
            plus: plus,
            reason: reasonSplit.reason
        });

        User.findOne({name: from}).exec(function(err, result){
            if(result && result.karma >= 0) {
                User.findOneAndUpdate({ name: user }, { $inc: { karma: plus ? 1 : -1 } })
                .exec(function(err, result) {
                    if(!result) {
                        Thing.findOneAndUpdate({ name: name }, { $inc: { karma: plus ? 1 : -1 } })
                        .exec(function(err, result) {
                            karmaLog.save();
                            if(!result) {
                                var thing = new Thing({
                                    name: name,
                                    karma: plus ? 1 : -1
                                });
                                thing.save();
                            }
                        });
                    } else {
                        karmaLog.taker = user;
                        karmaLog.reason = userReason;
                        karmaLog.save();
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
                bot.emit('response', err || name + ': ' + 0, sendTo);
            });
        });
    };

    actions.reasons = function(bot, from, to, text, split, sendTo) {
        KarmaLog.find({ taker: from }).exec(function(err, results) {
            if(results) {
                var plusCount = 0;
                var negCount = 0;
                var reasons = [0];
                results.forEach(function(result) {
                    if(result.reason) {
                        reasons.push((result.plus ? "++" : "--") + " " + result.reason + " from " + result.giver);
                    } else {
                        if(result.plus) {
                            plusCount++;
                        } else {
                            negCount++;
                        }
                    }
                });
                reasons[0] = plusCount + " ++ and " + negCount + " -- with no reason.";
                bot.emit('response', err || reasons, from);
                return;
            }
        });
    };

    var board = function(bot, sendTo, leader) {
        User.find({}).sort({ "karma": leader }).limit(3).exec(function(err, results) {
            var resp = results ? ["1st - " + results[0].name + " : " + results[0].karma,
                        "2nd - " + results[1].name + " : " + results[1].karma,
                        "3rd - " + results[2].name + " : " + results[2].karma, ] : null;
            bot.emit('response', err || resp, sendTo);
            return;
        });
    }

    actions.leaderboard = function(bot, from, to, text, split, sendTo) {
        board(bot, sendTo, -1);
    };

    actions.loserboard = function(bot, from, to, text, split, sendTo) {
        board(bot, sendTo, 1);
    };

    var compare = function(a, b) {
        if(a.total < b.total) {
            return 1;
        }
        if(a.total > b.total) {
            return -1;
        }
        return 0;
    };

    var groupKarmaLog = function(bot, sendTo, plus) {
        KarmaLog.collection.group(
            { giver: 1 },
            { plus: plus },
            { total: 0 },
            function(curr, result) { result.total++ },
            null,
            true,
            function(err, results) {
                results = results.sort(compare);
                var key = plus ? "internal_ben" : "internal_mal";
                helper.response(key, function(err, response) {
                    response = String.format(response, results[0].giver, results[0].total);
                    bot.emit('response', err || response, sendTo);
                });
            });
    }

    actions.ben = function(bot, from, to, text, split, sendTo) {
        groupKarmaLog(bot, sendTo, true);
    };

    actions.mal = function(bot, from, to, text, split, sendTo) {
        groupKarmaLog(bot, sendTo, false);
    };

    var employment = function(bot, from, sendTo, userList, value) {
      User.find({ heed: value }).exec(function(err, results) {
        var names = [];
        results.forEach(function(result) {
            if(result.name !== from && result.name in userList[sendTo]) {
                names.push(result.name);
            }
        });
        helper.response("internal_employment", function(err, response) {
            bot.emit('response', err || names.length > 0 ? '^^^ ' + names.join(', ') + ' ^^^' : response, sendTo);
        });
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
            helper.response("internal_T_notInvited", function(err, notInvited) {
                helper.response("internal_T_beverage", function(err, beverage) {
                    helper.response("internal_T_solitary", function(err, solitary) {
                        bot.emit('response', err || !teaParty ? notInvited :
                            names.length > 0 ? names.join(', ') + beverage :
                            solitary, sendTo);
                    });
                });
            });
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
            helper.response("internal_home_slacker", function(err, slacker) {
                helper.response("internal_home_not", function(err, not) {
                    bot.emit('response', err || from + ' ' + (value ? slacker : not), sendTo);
                });
            });
        });
    };

    actions.wfh = function(bot, from, to, text, split, sendTo) {
      tea(bot, from, sendTo, false);
    };

    actions.notWfh = function(bot, from, to, text, split, sendTo) {
      tea(bot, from, sendTo, true);
    };

})(module.exports);
