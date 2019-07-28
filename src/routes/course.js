const router = require('express').Router();

const CourseController = require('../controllers/course.controller');
const { isAuthenticated, isSubscribed, isAdmin } = require('../utils/middleware');

// const SessionController = require('../controllers/session.controller');

//  Add a new course to the db
router.post('/courses', isAuthenticated, isAdmin, CourseController.add);
//  Update/modify a course in the db
router.patch('/courses/:id', isAuthenticated, isAdmin, CourseController.update);
router.put('/courses/:id', isAuthenticated, isAdmin, CourseController.replace);
//  Delete a course in the db
router.delete('/courses/:id', isAuthenticated, isAdmin, CourseController.remove);
// Get audio file for a session

// GET a list of courses
router.get('/courses', isAuthenticated, CourseController.index);

// get specific course
router.get('/courses/:id', isAuthenticated, isSubscribed, CourseController.get);

router.get('/courses/:course_id/sessions/:session_id/audio', isAuthenticated, isSubscribed, CourseController.getAudio);

module.exports = router;
