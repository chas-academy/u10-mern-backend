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

router.get(
  '/user',
  (req, res) => {
    const { name, email } = req.user.google;

    if (req.isAuthenticated()) {
      return res.json({
        success: true,
        user: {
          name,
          email,
        },
      });
    }
    return res.json({
      success: false,
      err: 'Not authenticated',
    });
  },
);

module.exports = router;
