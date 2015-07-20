'use strict';
(function(helper){
	helper.choose = function(array){
		var index = Math.floor((Math.random() * array.length));
		return array[index];
	};

	helper.shorten = function(string){
		return string.substring(0, 475);
	};

})(module.exports);
