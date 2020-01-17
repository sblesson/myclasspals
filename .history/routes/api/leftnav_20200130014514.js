const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    console.log(req.query.screen);
    //default
    let leftnav = [
      {
        name: 'home',
        label: 'Home',
        icon: 'fa fa-home'
      },
      {
        name: 'general',
        label: '#General'
        //icon: 'fa fa-fw fa-lg fa-home',
        /*         items: [
          {
            name: 'statements',
            label: 'Statements',
            icon: 'fa fa-fw fa-lg fa-home'
          },
          {
            name: 'reports',
            label: 'Reports',
            icon: 'fa fa-fw fa-lg fa-home'
          }
        ] */
      },
      {
        name: 'recommendations',
        label:
          '#RecommendationsRecommendationsRecommendationsRecommendationsRecommendations'
        //icon: 'fa fa-fw fa-lg fa-home',
      }
    ];
    if (req.query.screen === 'profile') {
      leftnav = [
        {
          name: 'profile',
          label: 'View Profile',
          icon: 'fas fa-user-edit',
          url: '/edit-profile'
        },
        {
          name: 'account',
          label: 'Account',
          icon: 'fas fa-user-cog',
          url: '/my-profile'
        },
        {
          name: 'reminder',
          label: 'Reminder',
          icon: 'fas fa-sticky-note',
          url: '/add-reminder'
        }
      ];
    }
    res.json(leftnav);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
