const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');

router.get('/:screen', auth, async (req, res) => {
  try {
    let leftnav = [];
    if (req.params.screen === 'dashboard') {
      leftnav = [
        {
          name: 'home',
          label: 'Home',
          icon: 'fa fa-home'
        },
        {
          name: 'billing',
          label: 'Billing',
          icon: 'fa fa-fw fa-lg fa-home',
          items: [
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
          ]
        },
        {
          name: 'settings',
          label: 'Settings',
          icon: 'fa fa-fw fa-lg fa-home',

          items: [
            {
              name: 'profile',
              label: 'Profile',
              icon: 'fa fa-fw fa-lg fa-home'
            },
            {
              name: 'insurance',
              label: 'Insurance',
              icon: 'fa fa-fw fa-lg fa-home'
            },
            {
              name: 'notifications',
              label: 'Notifications',
              icon: 'fa fa-fw fa-lg fa-home',

              items: [
                {
                  name: 'email',
                  label: 'Email',
                  icon: 'fa fa-fw fa-lg fa-home'
                },
                {
                  name: 'desktop',
                  label: 'Desktop',
                  icon: 'fa fa-fw fa-lg fa-home',

                  items: [
                    {
                      name: 'schedule',
                      label: 'Schedule',
                      icon: 'fa fa-fw fa-lg fa-home'
                    },
                    {
                      name: 'frequency',
                      label: 'Frequency',
                      icon: 'fa fa-fw fa-lg fa-home'
                    }
                  ]
                },
                { name: 'sms', label: 'SMS', icon: 'fa fa-fw fa-lg fa-home' }
              ]
            }
          ]
        }
      ];
    } else {
      leftnav = [
        {
          name: 'home',
          label: 'Home',
          icon: 'fa fa-home'
        },
        {
          name: 'billing',
          label: 'Billing',
          icon: 'fa fa-fw fa-lg fa-home',
          items: [
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
          ]
        },
        {
          name: 'settings',
          label: 'Settings',
          icon: 'fa fa-fw fa-lg fa-home',

          items: [
            {
              name: 'profile',
              label: 'Profile',
              icon: 'fa fa-fw fa-lg fa-home'
            },
            {
              name: 'insurance',
              label: 'Insurance',
              icon: 'fa fa-fw fa-lg fa-home'
            },
            {
              name: 'notifications',
              label: 'Notifications',
              icon: 'fa fa-fw fa-lg fa-home',
            }
          ]
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
