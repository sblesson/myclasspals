const mongoose = require('mongoose');
<<<<<<< HEAD
var School = require('./School');
=======
>>>>>>> 54881ad2f7c207c5f89b336585b0b07518654a00

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
<<<<<<< HEAD
  interests: {
=======
  skills: {
>>>>>>> 54881ad2f7c207c5f89b336585b0b07518654a00
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
<<<<<<< HEAD
  username: {
    type: String
  },
  isTandCAccepted: { type: Boolean },
  community: [
=======
  githubusername: {
    type: String
  },
  school: [
>>>>>>> 54881ad2f7c207c5f89b336585b0b07518654a00
    {
      childName: {
        type: String,
        required: true
      },
<<<<<<< HEAD
=======
      schoolName: {
        type: String,
        required: true
      },
>>>>>>> 54881ad2f7c207c5f89b336585b0b07518654a00
      grade: {
        type: String,
        required: true
      },
      classRoom: {
        type: String
<<<<<<< HEAD
      },
      school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: School,
        required: true
=======
>>>>>>> 54881ad2f7c207c5f89b336585b0b07518654a00
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
