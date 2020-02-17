const mongoose = require('mongoose');
<<<<<<< HEAD
var Address = require('./Address');
=======
>>>>>>> 54881ad2f7c207c5f89b336585b0b07518654a00

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
<<<<<<< HEAD
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
=======
>>>>>>> 54881ad2f7c207c5f89b336585b0b07518654a00
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
