const router = require('express').Router();
const passport = require('passport');

const CourseController = require('./controllers/CourseController.js');

router.get('/auth/facebook',
  passport.authenticate('facebook', { scope: 'email' }));

router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    req.session.save(() => {
      res.redirect(process.env.CLIENT_ORIGIN);
    });
  },
);

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
    if (req.isAuthenticated()) {
      const { name, email } = req.user.google;
      return res.json({
        user: {
          name,
          email,
        },
      });
    }
    return res.status(401).send('Not authenticated');
  },
);

router.get('/courses', (req, res) => {
  CourseController.getCourses(res);
});

module.exports = router;
