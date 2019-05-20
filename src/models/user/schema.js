const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String,
  },
  google: {
    id: String,
    token: String,
    email: String,
    name: String,
  },
}, { timestamps: true });

module.exports = userSchema;
