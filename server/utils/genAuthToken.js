const jwt = require('jwt-simple');

const JWT_SECRET = process.env.JWT_SECRET;

function genAuthToken(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ id: user._id, createdAt: timestamp }, JWT_SECRET);
}

module.exports = genAuthToken;
