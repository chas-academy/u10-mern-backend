const mongoose = require('mongoose');
const SessionSchema = require('./Session.js');

const { Schema } = mongoose;

const CourseSchema = new Schema({
  name: String,
  sessions: [SessionSchema], // Includes the meditation sessions/lessons
});

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;
