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
          /*-  randomArticle picks one of the definitions and example at random. Feel free to remove this.-*/
          //var randomArticle = Math.floor((Math.random() * response.list.length) + 1);
          var definition = response.list[Object.keys(response.list)[0]].definition;
          var example    = response.list[Object.keys(response.list)[0]].example;
          bot.emit('response', from + ': Definition: ' + definition + ' - Example: ' + example, sendTo);
        }else{
          bot.emit('response', from + ': Page not found.', sendTo);
        }
      });

    }).on('error', function(e) {
        console.log('Got error: ' + e.message);
    });
  };
})(module.exports);