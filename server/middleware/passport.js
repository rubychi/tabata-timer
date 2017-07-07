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
    console.log(e);
    return done();
  }
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('x-auth'),
  secretOrKey: JWT_SECRET,
}

const jwtSignin = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await User.findById(payload.id);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch(e) {
    return done(e, false);
  }
});

passport.use(localSignin);
passport.use(jwtSignin);
