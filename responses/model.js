'use strict';
var mongoose = require('mongoose');

var schema = mongoose.Schema({
  key: [],
  response: [],
  __v: { type: Number, select: false }
});

var Response = mongoose.model('Response', schema);

module.exports = Response;
