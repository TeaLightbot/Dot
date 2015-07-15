'use strict';
(function(helper){
	helper.choose = function(array){
		var index = Math.floor((Math.random() * array.length));
		return array[index];
	};
})(module.exports);
