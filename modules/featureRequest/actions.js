'use strict';
var FeatureRequest = require('./model');
var os             = require("os");
var config         = require('../../setup/config.json');
var util           = require("util");

(function(actions){
    actions.store = function(bot, from, to, text, split, sendTo) {
        var response = null;
        if(split.length === 1) {
            return "You haven't supplied a feature...";
        }
        var featureRequest = new FeatureRequest({
            feature: split.splice(1).join(' '),
            from: from
        });

        featureRequest.save(function(err) {
            bot.emit('response', err || 'Your call is important to us, thank you for holding.', sendTo);
        });
	};

    actions.url = function(bot, from, to, text, split, sendTo){
        var hostname = os.hostname();

        var response = util.format("Current list viewable here (assuming network connectivity): " +
            "http://%s:%s/featureRequests",
            hostname,
            config.httpPort);

        // fetch feature request URL
        bot.emit('response', response, sendTo);
    };

})(module.exports);
