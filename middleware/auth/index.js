const { passportInitialize } = require('./passport.config');
const { authRouter, authenticationGuard } = require('./auth.router');

const initialize = passportInitialize;

module.exports = {
  initialize,
  authenticationGuard,
  authRouter,
};
