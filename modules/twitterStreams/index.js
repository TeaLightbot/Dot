'use strict';
var Twitter = require('twitter');
var config  = require('../../setup/config.json');
var colour  = require('../../colour.js');

(function(actions) {
    actions.query = function(bot){

        /* Checks if twitter keys exist in the config file */
        if (!config.twitter_consumer_key && !config.twitter_consumer_secret && !config.twitter_access_token_key && !config.twitter_access_token_secret){
            console.error('Keys for the twitter module are missing from the config file.');
            return;
        }

        var client = new Twitter({
            consumer_key:        config.twitter_consumer_key,
            consumer_secret:     config.twitter_consumer_secret,
            access_token_key:    config.twitter_access_token_key,
            access_token_secret: config.twitter_access_token_secret,
        });

        /* Push IDs for twitter accounts to followArray - http://tweeterid.com/ */
        var followArray = [];
        // Defaults. For Seils xoxo
        followArray.push(140118545);    // @Queen_UK
        followArray.push(242653461);    // @Charles_HRH
        followArray.push(213589222);    // @PrincePhilipDoE
        followArray.push(290525588);    // @DukeCambridgeUK
        followArray.push(402637402);    // @HRHCatherine
        followArray.push(954229010);    // @DevOpsReactions
        var following = followArray.join(', ');

        var tracking = null;

        client.stream('statuses/filter', {track: tracking, follow: following},  function(stream){
            stream.on('data', function(tweet) {
                if(!tweet.delete && (following.indexOf(tweet.user.id_str) > -1) && !tweet.retweeted_status){
                    var output = colour.blue + '@' + tweet.user.screen_name + ': ' + colour.black + colour.normal + tweet.text.replace(/\r?\n/g, '');

                    bot.emit('response', output, config.channels);
                }
            });

            stream.on('error', function(error) {
                console.error(error);
            });
        });
    };
})(module.exports);