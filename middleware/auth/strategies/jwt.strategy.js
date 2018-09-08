const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const { User } = require('../../../models/user.model');
const { SECRET } = require('../token');

function CustomJwtStrategy () {
  let options = {
    secretOrKey: SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };

  let strategy = new JwtStrategy(options, async function (jwtPayload, done) {
    try {
      let user = await User.findById(jwtPayload.id);
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    } catch (err) {
      console.log(err);
      done(err, null);
    }
  });

  return strategy;
};

module.exports = {
  CustomJwtStrategy,
};
