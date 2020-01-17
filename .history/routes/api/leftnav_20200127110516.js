const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');

router.get('/:screen', auth, async (req, res) => {
  try {
    if(req.params.screen === 'dashboard') {

    }
   
    res.json(leftnav);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
