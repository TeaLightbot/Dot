'use strict';
var helper = require('../helper');
var colour = require('../colour');

(function(actions){
  var chamber = [1,0,0,0,0,0];

  var click = colour.bold + "*Click*";
  var bang = colour.red + colour.bold + "*BANG!*";

  actions.trigger = function(){

    if(helper.choose(chamber)){
      chamber = [1,0,0,0,0,0];
      return bang;
    } else {
      chamber.pop();
      return click;
    }

  };
    
  actions.spin = function() {
      return helper.choose([1, 0, 0, 0, 0, 0]) ? bang : click;
  };
})(module.exports);
