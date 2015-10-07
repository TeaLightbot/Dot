'use strict';
var hotload = require("hotload");

(function(help) {
    help.actions = hotload('./actions');
    help.routes = hotload('./routes');
})(module.exports);
