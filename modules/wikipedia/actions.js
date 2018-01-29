'use strict';
var https = require('https');
var helper = require('../../helper');

(function(actions) {
    actions.query = function(bot, from, to, text, split, sendTo) {
        var options = {
            accept: '*/*',
            host: 'en.wikipedia.org',
            port: 443,
            path: '/w/api.php?action=opensearch&format=json&search=' + split.slice(1).join('%20')
        };
        var response = '';
        https.get(options, function(res) {

            res.on('data', function(chunk) {
                response += chunk;
            });

            res.on('end', function() {
                response = JSON.parse(response);
                var searchQuery = response[0];
                var anyMatches = response[1].length > 0;
                var respondWith = "";

                if(!anyMatches) {
                    respondWith = "No matches found for " + searchQuery;
                } else {
                    var topHit = response[1][0];
                    var linkToTopHit = response[3][0];

                    respondWith = "wiki search for: \"" + searchQuery + "\": ";
                    respondWith += topHit + " - ";
                    respondWith += linkToTopHit;
                }
                bot.emit('response', from + ': ' + respondWith, sendTo);
            });
        }).on('error', function(e) {
            console.log('Got error: ' + e.message);
        });
    };
})(module.exports);