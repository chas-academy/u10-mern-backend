const mongoose = require('mongoose');

const { Schema } = mongoose;

const sessionSchema = new Schema({
  title: String,
  duration: Number, // Seconds
  filePath: String,
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = { Session, sessionSchema };
