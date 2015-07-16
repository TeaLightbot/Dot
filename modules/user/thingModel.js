'use strict';
var mongoose = require('mongoose');

var schema = mongoose.Schema({
  name: { type: String, required: true },
  karma: { type: Number, default: 0, required: true },
  __v: { type: Number, select: false }
});

var Thing = mongoose.model('Thing', schema);

module.exports = Thing;
