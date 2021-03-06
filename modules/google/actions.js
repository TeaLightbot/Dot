'use strict';
var config = require('../../setup/config.json');
var https = require('https');
var util = require('util');
var querystring = require('querystring');

(function(actions) {
  var baseGoogleUrl = "https://www.googleapis.com/customsearch/v1?key=%s&cx=%s&num=1&fields=items(title,link)&prettyPrint=false&q=%s";
  var req = function(bot, from, split, sendTo) {
    var key = config.google_key;
    var cx = config.google_cx;
    var query = querystring.escape(split.slice(1).join(' '));
    var targetUrl = util.format(baseGoogleUrl, key, cx, query);
    console.log(targetUrl)
    var output = ''
    var request = https.get(targetUrl, (response) => {
      response.on('data', (data) => {
	console.log(data)
	output += data;
      })

      response.on('end', ()=>{
        var googleResult = JSON.parse(output);
	console.log(googleResult)
        if (googleResult.items.length > 0) {
          var firstResult = googleResult.items[0];
          bot.emit('response', firstResult.title + ' - ' + firstResult.link, sendTo);
        } else {
          bot.emit('response', "No results found.", sendTo);
        }
      });
    });
  };

  actions.query = function(bot, from, to, text, split, sendTo){
    req(bot, from, split, sendTo);
  };

  actions.queryDesc = function(bot, from, to, text, split, sendTo) {
    req(bot, from, split, sendTo);
  };
})(module.exports);







