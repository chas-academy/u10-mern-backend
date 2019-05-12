const mongoose = require('mongoose');

const { Schema } = mongoose;

// Schema for a single meditation session/lesson
const SessionSchema = new Schema({
  title: String,
  description: String,
  filePath: String,
  // duration: String,  Need to figure out how to insert duration
});

const Session = mongoose.model('Session', SessionSchema);

module.exports = Session;
