const mongoose = require('mongoose');

const SchoolSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
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
      schoolName: {
        type: String,
        required: true
      },
      grade: {
        type: String,
        required: true
      },
      classRoom: {
        type: String
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
