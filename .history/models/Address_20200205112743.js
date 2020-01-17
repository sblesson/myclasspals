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
  state: {
    type: String,
    required: true
  },
  zipcode: {
    type: String,
    required: true
  }
});

module.exports = Address = mongoose.model('address', AddressSchema);
