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
      }
    ];
    if (req.query.screen === 'profile') {
      leftnav = [
        {
          name: 'profile',
          label: 'My Profile',
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
    if (req.query.screen === 'groups') {
      leftnav = [
        {
          name: 'search_group',
          label: 'Search Groups',
          icon: 'fas fa-search',
          url: '/group/search/' + req.query.id
        },
        {
          name: 'profiles',
          label: 'Directory',
          icon: 'fas fa-user-edit',
          url: '/profiles/' + req.query.id
        }
      ];
    }
    if (req.query.screen === 'group') {
      leftnav = [
        {
          name: 'members',
          label: 'Membership',
          icon: 'fas fa-user-edit',
          url: '/group/' + req.query.id
        },
        {
          name: 'group_rules',
          label: 'Group Rules',
          icon: 'fas fa-user-cog',
          url: '/group/group_rules/' + req.query.id
        },
        {
          name: 'about_group',
          label: 'About',
          //icon: 'fas fa-user-edit',
          url: '/group/about/' + req.query.id
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
