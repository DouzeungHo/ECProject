var mongoose = require('mongoose');
var planSchema = require('../schemas/tourPlan.js');

module.exports = mongoose.model('tourPlan',planSchema);