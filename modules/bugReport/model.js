'use strict';
var mongoose = require('mongoose');

var schema = mongoose.Schema({
  from: { type: String, required: true },
  bug: { type: String, required: true },
  status: { type: String, default: 'reported' },
  __v: { type: Number, select: false }
});

var BugReport = mongoose.model('BugReport', schema);

module.exports = BugReport;
