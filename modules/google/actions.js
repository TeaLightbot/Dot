'use strict';
var google = require('google');
var totalSaves = 0;

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
    while (links[index] && links[index].title && links[index].title === ''){
			index++;
			if (index > links.length){
				index--;
				break;
			}
		}
      if(links[index] && links[index].title){
        var resp = [from + ': ' + links[index].title + ' - ' + links[index].link, links[index].description, links[index].img];
        bot.emit('response', err || desc ? resp : resp[0], sendTo);
      }else{
        totalSaves++;
        var resp = [from + ': ' + 'Something odd happened there, but at least we didn\'t crash. Bad queries since last bot ejection: ' + totalSaves];
        bot.emit('response', err || desc ? resp : resp[0], sendTo);
      }

    });
  };

  actions.query = function(bot, from, to, text, split, sendTo){
    req(bot, from, split, sendTo, false);
  };

  actions.queryDesc = function(bot, from, to, text, split, sendTo) {
    req(bot, from, split, sendTo, true);
  };
})(module.exports);