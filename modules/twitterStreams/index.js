'use strict';
var Twitter = require('twitter');
var config  = require('../../setup/config.json');

(function(actions) {
  actions.query = function(bot, sendTo){

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
    var following = followArray.join(', ');

    var tracking = null;

    client.stream('statuses/filter', {track: tracking, follow: following},  function(stream){
      stream.on('data', function(tweet) {
        if(!tweet.delete && (following.indexOf(tweet.user.id_str) > -1) && !tweet.retweeted_status){
          bot.emit('response', '@' + tweet.user.screen_name + ': ' + tweet.text, sendTo);
          //console.log('@' + tweet.user.screen_name + ' --- ' + tweet.text.replace(/\r?\n/g, ''));
        }
      });

      stream.on('error', function(error) {
        console.error(error);
      });
    });
  };
})(module.exports);
