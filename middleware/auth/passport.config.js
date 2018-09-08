const passport = require('passport');
const { CustomJwtStrategy } = require('./strategies/jwt.strategy');

function strategiesInit () {
  passport.use(CustomJwtStrategy());
}

function passportInitialize () {
  const initObject = passport.initialize();
  strategiesInit();
  return initObject;
};

module.exports = { passportInitialize };
