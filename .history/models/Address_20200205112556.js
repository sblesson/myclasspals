const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  street: {
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
  address: [Address.schema],
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

module.exports = Address = mongoose.model('address', AddressSchema);
