const express = require('express');
const router = express.Router();
const passport = require('passport');

const { AuthController } = require('./auth.controller');
const { AuthTokenFactory } = require('./token');
const { User } = require('../../models/user.model');

const authToken = AuthTokenFactory();

const controller = AuthController(User, authToken);
const authenticationGuard = passport.authenticate('jwt', {session: false});

router.post('/login', controller.login);

router.get('/login', authenticationGuard, function (req, res, next) {
  res.status(200).end();
});

module.exports = { authRouter: router, authenticationGuard };
