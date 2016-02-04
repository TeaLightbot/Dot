'use strict';
var google = require('google');

(function(actions) {
  var req = function(bot, from, split, sendTo, desc) {
    google.resultsPerPage = 1;
    google(split.slice(1).join(' '), function(err, next, links) {
      if(err){
        console.error(err);
      }
      console.log(next)
        console.log(links)
		var index = 0;
		while (links[index] && links[index].title === ''){
			index++;
			if (index > links.length){
				index--;
				break;
			}
		}
      var resp = [from + ': ' + links[index].title + ' - ' + links[index].link, links[index].description, links[index].img];
      bot.emit('response', err || desc ? resp : resp[0], sendTo);
    });
  };

  actions.query = function(bot, from, to, text, split, sendTo){
    req(bot, from, split, sendTo, false);
  };

  actions.queryDesc = function(bot, from, to, text, split, sendTo) {
    req(bot, from, split, sendTo, true);
  };
})(module.exports);
