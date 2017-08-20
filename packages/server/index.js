require('./config');

const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const passportMiddleware = require('./middleware/passport');
const requireSignin = passport.authenticate('local', { session: false });
const requireAuth = passport.authenticate('jwt', { session: false });
const requireGoogleAuth = passport.authenticate('google', { scope: ['profile'], session: false });
const requireFacebookAuth = passport.authenticate('facebook', { session: false });
const mongoose = require('./db/mongoose');
const User = require('./models/user');
const Presets = require('./models/presets');
const genAuthToken = require('./utils/genAuthToken');

const app = express();
const PORT = process.env.PORT;

if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
  const cors = require('cors');
  app.use(cors());
} else {
  console.log("hey");
  app.use(helmet());
  app.use(express.static('build'));
}
app.use(bodyParser.json());

app.get('/presets', requireAuth, async (req, res) => {
  try {
    const presets = await Presets.find({ _creator: req.user._id });
    return res.send({ presets: presets[0].presets });
  } catch(e) {
    res.status(400).send(e);
  }
});

app.get('/auth/google', requireGoogleAuth);

app.get('/auth/google/return', requireGoogleAuth, (req, res, next) => {
  res.cookie('token', genAuthToken(req.user));
  res.sendFile(path.join(__dirname, '/authPopup.html'));
});

app.get('/auth/facebook', requireFacebookAuth);

app.get('/auth/facebook/return', requireFacebookAuth, (req, res, next) => {
  res.cookie('token', genAuthToken(req.user));
  res.sendFile(path.join(__dirname, '/authPopup.html'));
});

app.post('/presets', requireAuth, async(req, res) => {
  try {
    await Presets.findOrCreate({ _creator: req.user._id }, { presets: req.body });
    return res.send();
  } catch(e) {
    return res.status(400).send(e);
  }
});

app.post('/signin', requireSignin, (req, res) => {
  return res.send({ token: genAuthToken(req.user) });
});

app.post('/signup', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password' });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    } else {
      const user = new User({ email, password });
      await user.save();
      return res.send({ token: genAuthToken(user) });
    }
  } catch (e) {
    return res.status(400).send();
  }
});

app.patch('/presets', requireAuth, async (req, res) => {
  try {
    await Presets.update({ _creator: req.user._id }, { $set: { presets: req.body } });
    return res.send();
  } catch(e) {
    return res.status(400).send(e);
  }
});

app.listen(PORT, () => console.log(`Server is up and running at port ${PORT}`));
