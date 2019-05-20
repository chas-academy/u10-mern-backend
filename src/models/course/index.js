const mongoose = require('mongoose');
const courseSchema = require('./schema');

module.exports = mongoose.model('Course', courseSchema);
