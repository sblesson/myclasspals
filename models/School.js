const mongoose = require('mongoose');

const SchoolSchema = new mongoose.Schema({
  schoolName: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  zip: {
    type: String
  }
});

module.exports = School = mongoose.model('school', SchoolSchema);
