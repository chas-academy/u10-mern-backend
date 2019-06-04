const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: String,
  duration: Number, // Seconds
  filePath: String,
});

module.exports = mongoose.model('Session', schema);
