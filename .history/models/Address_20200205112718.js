const mongoose = require('mongoose');

{userData.address.street}, {userData.address.suite}
{userData.address.city}, {userData.address.state}{' '}
{userData.address.zipcode}

const AddressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true
  },
  suite: {
    type: String,
    required: false
  },
  city: {
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
