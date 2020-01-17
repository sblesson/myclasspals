const mongoose = require('mongoose');

{userData.address.street}, {userData.address.suite}
{userData.address.city}, {userData.address.state}{' '}
{userData.address.zipcode}

const AddressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: false
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
    required: false
  },
  zipcode: {
    type: String,
    required: false
  }
});

module.exports = Address = mongoose.model('address', AddressSchema);
