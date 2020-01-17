const mongoose = require('mongoose');



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
