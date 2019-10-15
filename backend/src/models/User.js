const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  admin: Boolean,
  email: String,
  name: String,
  password: String,
  receiveNotifications: Boolean
});

module.exports = mongoose.model('User', UserSchema);