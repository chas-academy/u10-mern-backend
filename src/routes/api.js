const router = require('express').Router();

const CourseController = require('../controllers/CourseController.js');

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
  if (req.isAuthenticated()) {
    CourseController.getCourses(res);
  }
  return res.status(401).send('Not authenticated');
});

module.exports = router;
