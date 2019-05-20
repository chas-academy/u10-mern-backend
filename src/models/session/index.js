const mongoose = require('mongoose');
const sessionSchema = require('./schema');

module.exports = mongoose.model('Session', sessionSchema);
