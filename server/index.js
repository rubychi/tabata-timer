require('./config');

const express = require('express');
const bodyParser = require('body-parser');
// const bcrypt = require('bcryptjs');
const passport = require('passport');
const passportMiddleware = require('./middleware/passport');
const authSignin = passport.authenticate('local', { session: false });
const mongoose = require('./db/mongoose');
const User = require('./models/user');
const genAuthToken = require('./utils/genAuthToken');

const app = express();
const PORT = process.env.PORT;

if (process.env.NODE_ENV === 'test' && process.env.NODE_ENV === 'development') {

} else {
  // app.use(express.static('build'));
}
app.use(bodyParser.json());
// app.use(cors());

app.post('/signin', authSignin, (req, res) => {
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
    return res.status(400).send(e);
  }
});

app.listen(PORT, () => console.log(`Server is up and running at port ${PORT}`));
