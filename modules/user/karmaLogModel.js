'use strict';
var mongoose = require('mongoose');

var schema = mongoose.Schema({
    giver: { type: String, required: true },
    taker: { type: String, required: true },
    plus: {type: Boolean, required: true },
    reason: { type: String, required: false },
    time: {type: Date, default: new Date },
    __v: { type: Number, select: false }
});

var KarmaLog = mongoose.model('KarmaLog', schema);

module.exports = KarmaLog;
