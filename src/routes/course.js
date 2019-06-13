const router = require('express').Router();

const CourseController = require('../controllers/course.controller');
// const SessionController = require('../controllers/session.controller');

// TODO:
//  Add a new course to the db
router.post('/courses', CourseController.add);
//  Update/modify a course in the db
router.patch('/courses/:id', CourseController.update);
router.put('/courses/:id', CourseController.replace);
//  Delete a course in the db
router.delete('/courses/:id', CourseController.remove);
// Get audio file for a session

// GET a list of courses
router.get('/courses', (req, res) => {
  if (req.isAuthenticated()) {
    return CourseController.index(res);
  }
  return res.status(401).send('Not authenticated!');
});

// get specific course
router.get('/courses/:id', CourseController.get);

router.get('/courses/:course_id/sessions/:session_id/audio', CourseController.getAudio);
router.get('/audio', CourseController.getAudio);


module.exports = router;
