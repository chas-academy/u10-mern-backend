const User = require('../../models/user.model');
const facebookStrategy = require('./facebookStrategy');
const googleStrategy = require('./googleStrategy');

module.exports = (passport) => {
  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

  passport.deserializeUser((id, cb) => {
    User.findById(id, (err, user) => {
      cb(err, user);
    });
  });

  passport.use(facebookStrategy);
  passport.use(googleStrategy);
};
