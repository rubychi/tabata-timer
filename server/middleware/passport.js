const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');
const JWT_SECRET = process.env.JWT_SECRET;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;

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

const googleOptions = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: GOOGLE_CALLBACK_URL,
};

const googleSignin = new GoogleStrategy(googleOptions, async (accessToken, refreshToken, profile, cb) => {
  try {
    const user = await User.findOrCreate({ googleId: profile.id });
    return cb(null, user);
  } catch(e) {
    return cb(e, null)
  }
});

passport.use(localSignin);
passport.use(jwtSignin);
passport.use(googleSignin);
