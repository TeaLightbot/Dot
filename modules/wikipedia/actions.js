'use strict';
var https = require('https');
var helper = require('../../helper');

(function(actions) {
    actions.query = function(bot, from, to, text, split, sendTo) {
        var options = {
            accept: '*/*',
            host: 'en.wikipedia.org',
            port: 443,
            path: '/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=' + split.slice(1).join('%20')
        };
        var response = '';
        https.get(options, function(res) {

            res.on('data', function(chunk) {
                response += chunk;
            });

            res.on('end', function() {
                response = JSON.parse(response);
                if(response.query.pages[Object.keys(response.query.pages)[0]].extract == undefined) {
                    bot.emit('response', from + ': Page not found.', sendTo);
                } else {
                    var extract = helper.shorten(response.query.pages[Object.keys(response.query.pages)[0]].extract);
                    bot.emit('response', from + ': ' + extract, sendTo);
                }
            });
        }).on('error', function(e) {
            console.log('Got error: ' + e.message);
        });
    };
})(module.exports);