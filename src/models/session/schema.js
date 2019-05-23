const mongoose = require('mongoose');

const { Schema } = mongoose;

// Schema for a single meditation session/lesson
const sessionSchema = new Schema({
  title: String,
  duration: Number, // Seconds
  filePath: String,
});

module.exports = sessionSchema;
