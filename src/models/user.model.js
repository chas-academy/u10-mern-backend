const mongoose = require('mongoose');

const schema = new mongoose.Schema({
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
  role: { type: String, default: 'user' },
  subscription: {
    active: { type: Boolean, default: false },
  },
}, { timestamps: true });

module.exports = mongoose.model('User', schema);
