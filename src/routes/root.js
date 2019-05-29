const router = require('express').Router();
const passport = require('passport');

router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    req.session.save(() => {
      res.redirect(process.env.CLIENT_ORIGIN);
    });
  },
);

module.exports = router;
