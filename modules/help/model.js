'use strict';
var mongoose = require('mongoose');

var schema = mongoose.Schema({
  command: { type: String, required: true },
  description: { type: String, required: true },
  __v: { type: Number, select: false }
});

var Help = mongoose.model('Help', schema);

module.exports = Help;
