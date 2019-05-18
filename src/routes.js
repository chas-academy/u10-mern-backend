const router = require('express').Router();
const passport = require('passport');

const CourseController = require('./controllers/CourseController.js');

router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect(process.env.CLIENT_ORIGIN);
  },
);

router.get('/courses', (req, res) => {
  CourseController.getCourses(res);
});

module.exports = router;
