'use strict';
var mongoose = require('mongoose');

var schema = mongoose.Schema({
  from: { type: String, required: true },
  sendTo: { type: String, required: true },
  message: { type: String, required: false },
  command: { type: String, required: false },
  to: { type: String, required: false },
  date: { type: Date, default: Date.now, required: true },
  sent: { type: Boolean, default: false },
  __v: { type: Number, select: false }
});

var Reminder = mongoose.model('Reminder', schema);

module.exports = Reminder;
