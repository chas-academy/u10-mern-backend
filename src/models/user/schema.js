const mongoose = require('mongoose');

const schema = mongoose.Schema({
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

module.exports = schema;
