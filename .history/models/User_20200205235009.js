const mongoose = require('mongoose');
var Address = require('./Address');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Address
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('user', UserSchema);
