var action = function(client, from, to, text, message) {
  var q = text.split(/ (.+)/)[1];
  if (!q || q.length == 0) {
    return 'no keyword given, Silly ass';
  }

  return 'http://google.com/search?q=' + escape(q);
};

module.exports = action;
