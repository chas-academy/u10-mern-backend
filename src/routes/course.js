const router = require('express').Router();

const CourseController = require('../controllers/course.controller.js');

router.get('/courses', (req, res) => {
  if (req.isAuthenticated()) {
    return CourseController.index(res);
  }
  return res.status(401).send('Not authenticated!');
});

module.exports = router;
