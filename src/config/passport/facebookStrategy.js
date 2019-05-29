const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../../models/user');

module.exports = new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK,
  profileFields: ['email'],
},
(accessToken, refreshToken, profile, cb) => {
  // eslint-disable-next-line consistent-return
  User.findOne({ 'facebook.id': profile.id }, (err, user) => {
    if (err) {
      return cb(err);
    }
    if (user) {
      return cb(null, user);
    }
    const newUser = new User();

    newUser.facebook.id = profile.id;
    newUser.facebook.token = accessToken;
    newUser.facebook.name = profile.displayName;
    newUser.facebook.email = profile.emails[0].value;

    // eslint-disable-next-line no-shadow
    newUser.save((err) => {
      if (err) throw err;
      return cb(null, newUser);
    });
  });
});
