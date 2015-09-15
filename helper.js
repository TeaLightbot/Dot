'use strict';
var Responses = require('./responses/model');

(function(helper){
	helper.choose = function(array){
		var index = Math.floor((Math.random() * array.length));
		return array[index];
	};

	helper.shorten = function(string){
		return string.substring(0, 475);
	};

	helper.response = function(key, callback) {
	    Responses.findOne({ key: key }).exec(function(err, result){
	        callback(err, helper.choose(result.response));
	    });
	};

	if(!String.format) {
	    String.format = function(format) {
	        var args = Array.prototype.slice.call(arguments, 1);
	        return format.replace(/{(\d+)}/g, function(match, number) {
	            return typeof args[number] != 'undefined'
                  ? args[number]
                  : match
	            ;
	        });
	    };
	}

})(module.exports);
