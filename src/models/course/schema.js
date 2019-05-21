const mongoose = require('mongoose');
const sessionSchema = require('../session/schema.js');

const { Schema } = mongoose;

const courseSchema = new Schema({
  name: String,
  sessions: [sessionSchema], // Includes the meditation sessions/lessons
});

module.exports = courseSchema;
