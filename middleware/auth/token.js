const jwtSimple = require('jwt-simple');

const SECRET = process.env.JWT_SECRET || 'secret';

class JwtToken {
  constructor (secret) {
    this.secret = secret;
  }

  create (payload) {
    return jwtSimple.encode(payload, this.secret);
  };

  verify (token) {
    try {
      const payload = jwtSimple.decode(token, this.secret);
      return payload;
    } catch (e) {
      return null;
    }
  }
}

class AuthToken {
  constructor (secret) {
    this.jwt = new JwtToken(secret);
  }

  create (user) {
    const payload = {id: user.id};
    return this.jwt.create(payload);
  }

  verify (token) {
    return this.jwt.verify(token);
  }
}

function AuthTokenFactory () {
  return new AuthToken(SECRET);
}

module.exports = {
  SECRET,
  JwtToken,
  AuthToken,
  AuthTokenFactory,
};
