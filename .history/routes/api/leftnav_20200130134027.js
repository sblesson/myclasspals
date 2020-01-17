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
        icon: 'fa fa-home',
        url: '/dashboard'
      },
      {
        name: 'general',
        label: '#General',
        url: '/dashboard?filter=general'
      },
      {
        name: 'recommendations',
        label: '#Recommendations',
        url:'/dashboardfilter=general'
      }
    ];
    if (req.query.screen === 'profile') {
      leftnav = [
        {
          name: 'profile',
          label: 'View Profile',
          icon: 'fas fa-user-edit',
          url: '/view-profile'
        },
        {
          name: 'account',
          label: 'Account Settings',
          icon: 'fas fa-user-cog',
          url: '/account'
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
