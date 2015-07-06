var google = require('google');

(function(actions) {
    var req = function(bot, split, sendTo, desc) {
        google.resultsPerPage = 1;
        google(split.slice(1).join(" "), function(err, next, links) {
            if(err) console.error(err)
            var resp = [links[0].title + ' - ' + links[0].link,
                        links[0].description];

            bot.emit('response', err || desc ? resp : resp[0], sendTo);
        });
    };

    actions.query = function(bot, from, to, text, split, sendTo){
        req(bot, split, sendTo, false);
    };

    actions.queryDesc = function(bot, from, to, text, split, sendTo) {
        req(bot, split, sendTo, true);
    };
})(module.exports)