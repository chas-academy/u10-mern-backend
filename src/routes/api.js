const router = require('express').Router();

const CourseController = require('../controllers/CourseController.js');

router.get(
  '/user',
  (req, res) => {
    if (req.isAuthenticated()) {
      const { name, email } = req.user.google;
      const { subscription } = req.user;
      return res.json({
        user: {
          name,
          email,
          subscription,
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
