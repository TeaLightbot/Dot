'use strict';
var http = require('http');

(function(actions) {
  actions.query = function(bot, from, to, text, split, sendTo){
    var options = {
      host: 'api.urbandictionary.com',
      port: 80,
      path: '/v0/define?term=' + split.slice(1).join('%20')
    };

    var response = '';
    http.get(options, function(res) {
    console.log('Got response: ' + res.statusCode);

    res.on('data', function(chunk) {
      response += chunk;
      console.log('BODY: ' + chunk);
    });

    res.on('end', function() {
      response = JSON.parse(response);
      console.log(response);
      if(response.result_type === 'exact'){
        var randomArticle = Math.floor((Math.random() * response.list.length));
        var definition = response.list[Object.keys(response.list)[randomArticle]].definition;
        var example    = response.list[Object.keys(response.list)[randomArticle]].example;
        bot.emit('response', 'Definition: ' + definition + ' - Example: ' + example, sendTo);
      }else{
        bot.emit('response', 'Page not found. http://' + options.host + options.path + split.slice(1).join('%20'), sendTo);
      }
    });

    }).on('error', function(e) {
        console.log('Got error: ' + e.message);
    });
  };
})(module.exports);
