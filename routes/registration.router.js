var express = require('express');
var router = express.Router();

var _ = require('lodash');

var { User } = require('../models/user.model');
var { authenticationGuard } = require('../middleware/auth');
var { genenerateKeys } = require('./../lib/keygen');

/* GET users listing. */
router.post('/', async function(req, res) {
  let body = _.pick(req.body, ['phone_number', 'account_id', 'name']);
  try{
    let keys = genenerateKeys();
    let userData = _.assign(body, {public_key: keys.public_key});
    let user = await User.create(userData);
    res.status(200).json(keys).end();
  }catch(e){
    res.status(400).json(e);
  }
});

module.exports = router;
