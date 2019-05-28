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
  subscription: {
    active: { type: Boolean, default: false },
  },
}, { timestamps: true });

module.exports = userSchema;
