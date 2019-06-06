const mongoose = require('mongoose');
const { sessionSchema } = require('./session.model');

const schema = new mongoose.Schema({
  name: String,
  sessions: [sessionSchema],
});

module.exports = mongoose.model('Course', schema);
