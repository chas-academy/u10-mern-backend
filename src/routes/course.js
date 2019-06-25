const router = require('express').Router();

const CourseController = require('../controllers/course.controller');
const { isAuthenticated } = require('../utils/middleware');

// const SessionController = require('../controllers/session.controller');

//  Add a new course to the db
router.post('/courses', isAuthenticated, CourseController.add);
//  Update/modify a course in the db
router.patch('/courses/:id', isAuthenticated, CourseController.update);
router.put('/courses/:id', isAuthenticated, CourseController.replace);
//  Delete a course in the db
router.delete('/courses/:id', isAuthenticated, CourseController.remove);
// Get audio file for a session

// GET a list of courses
router.get('/courses', isAuthenticated, CourseController.index);

// get specific course
router.get('/courses/:id', isAuthenticated, CourseController.get);

router.get('/courses/:course_id/sessions/:session_id/audio', isAuthenticated, CourseController.getAudio);
router.get('/audio', isAuthenticated, CourseController.getAudio);


module.exports = router;
