const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../../models/user.model');

module.exports = new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK,
},
(accessToken, refreshToken, profile, cb) => {
  // eslint-disable-next-line consistent-return
  User.findOne({ 'google.id': profile.id }, (err, user) => {
    if (err) {
      return cb(err);
    }
    if (user) {
      return cb(null, user);
    }
    const newUser = new User();

    newUser.google.id = profile.id;
    newUser.google.token = accessToken;
    newUser.google.name = profile.displayName;
    newUser.google.email = profile.emails[0].value;

    // eslint-disable-next-line no-shadow
    newUser.save((err) => {
      if (err) throw err;
      return cb(null, newUser);
    });
  });
});
