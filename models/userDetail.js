var mongoose = require('mongoose');
var usersSchema = require('../schemas/userDetail.js');

module.exports = mongoose.model('UserDetail',usersSchema);