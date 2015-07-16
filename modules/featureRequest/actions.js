'use strict';
var FeatureRequest = require('./model');

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

})(module.exports);
