'use strict';
var helper = require('../helper');
var colour = require('../colour');

(function(actions){
  var chamber = [1,0,0,0,0,0];

  actions.trigger = function(){

    if(helper.choose(chamber)){
      chamber = [1,0,0,0,0,0];
      return colour.red + colour.bold + "*BANG!*";
    } else {
      chamber.pop();
      return colour.bold + "*Click*";
    }

  };
})(module.exports);
