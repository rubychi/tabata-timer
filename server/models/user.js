const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email',
    },
  },
  password: {
    type: String,
    minlength: 8,
  },
  googleId: String,
  facebookId: String,
});

UserSchema.pre('save', async function (next) {
  let user = this;
  if (user.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt)
      user.password = hash;
      next();
    } catch(e) {
      next(e);
    }
  }
  next();
});

UserSchema.methods.cmpPassword = async function (password) {
  try {
    const isMatch = await bcrypt.compare(password, this.password);
    return ({ error: null, isMatch });
  } catch(e) {
    return ({ error: e });
  }
}

UserSchema.plugin(findOrCreate);

let User = mongoose.model('User', UserSchema);

module.exports = User;
