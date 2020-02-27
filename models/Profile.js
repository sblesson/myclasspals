const mongoose = require('mongoose');
var School = require('./School');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  interests: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  username: {
    type: String
  },
  isTandCAccepted: { type: Boolean },
  community: [
    {
      childName: {
        type: String,
        required: true
      },
      grade: {
        type: String,
        required: true
      },
      classRoom: {
        type: String
      },
      school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: School,
        required: true
      }
    }
  ],
  reminder: [
    {
      reminderName: {
        type: String,
        required: true
      },
      reminderDate: {
        type: Date,
        required: true
      },
      description: {
        type: String
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
