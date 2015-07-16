'use strict';
var mongoose = require('mongoose');

var schema = mongoose.Schema({
  from: { type: String, required: true },
  feature: { type: String, required: true },
  status: { type: String, default: 'reported' },
  __v: { type: Number, select: false }
});

var FeatureRequest = mongoose.model('FeatureRequest', schema);

module.exports = FeatureRequest;
