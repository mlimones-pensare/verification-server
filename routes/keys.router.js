var express = require('express');
var router = express.Router();
var { User } = require('../models/user.model');
var { authenticationGuard } = require('../middleware/auth');
const NodeRSA = require('node-rsa');

/* GET users listing. */
router.use(authenticationGuard);

router.put('/', async function(req, res) {
  const rsaObject = new NodeRSA({b: 512});
  const user = req.user;
  let keys = {
    public: rsaObject.exportKey('public'),
    private: rsaObject.exportKey('private'),
  };
  user.public_key = keys.public;
  user.save();
  res.json(keys).end();
});

router.get('/', async function(req, res) {
  const rsaObject = new NodeRSA({b: 512});
  const user = req.user;
  let keys = {
    public: rsaObject.exportKey('public'),
    private: rsaObject.exportKey('private'),
  };
  user.public_key = keys.public;
  user.save();
  res.json(keys).end();
});

module.exports = router;
