var express = require('express');
var router = express.Router();
var { User } = require('../models/user.model');
var { authenticationGuard } = require('../middleware/auth');

/* GET users listing. */
router.use(authenticationGuard);
router.get('/', async function(req, res) {
  user = req.user;
  res.json(user);
});

module.exports = router;
