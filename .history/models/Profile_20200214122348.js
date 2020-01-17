const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  company: {
    type: String
  },
  website: {
    type: String
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
      schoolName: {
        type: String,
        required: true
      },
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
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
