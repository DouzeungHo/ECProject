var mongoose = require('mongoose');
var usersSchema = require('../schemas/tourGuy.js');

module.exports = mongoose.model('tourGuy',usersSchema);