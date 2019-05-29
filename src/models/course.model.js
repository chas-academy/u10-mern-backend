const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: String,
  sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Session' }],
});

module.exports = mongoose.model('Course', schema);
