const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    console.log(req.query.screen);
    //default
    let categories = [
      {
        category_id: 1,
        title: 'General',
        url: '/general/'
      },
      {
        category_id: 2,
        title: 'Recommendations',
        url: '/recommendations/'
      },
      {
        category_id: 3,
        title: 'Question on Homework',
        url: '/homework/'
      },
      {
        category_id: 4,
        title: 'Lost & Found',
        url: '/lostfound/'
      },
      {
        category_id: 5,
        title: 'Volunteering',
        url: '/volunteering/'
      },
      {
        category_id: 6,
        title: 'About the Event',
        url: '/aboutevent/'
      },

      {
        category_id: 7,
        title: 'Birthday Invite',
        url: '/birthday/'
      },
      {
        category_id: 8,
        title: 'Fieldtrips or camps',
        url: '/fieldtrips/'
      },
      {
        category_id: 9,
        title: 'Aftercare',
        url: '/aftercare/'
      },
      {
        category_id: 10,
        title: 'Carpool',
        url: '/carpool/'
      },
      {
        category_id: 11,
        title: 'Urgent',
        url: '/urgent/'
      },
      {
        category_id: 12,
        title: 'Classes & Clubs',
        url: '/clubs/'
      }
    ];
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
