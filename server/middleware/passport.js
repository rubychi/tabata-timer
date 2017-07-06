const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const User = require('../models/user');
const JWT_SECRET = process.env.JWT_SECRET;

const localSignin = new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    const result = await user.cmpPassword(password);
    if (result.error) {
      return done(error);
    }
    if (!result.isMatch) {
      return done(null, false);
    }
    return done(null, user);
  } catch(e) {
    return done(e);
  }
});

passport.use(localSignin);
