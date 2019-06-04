const Course = require('../models/course.model');

const index = (res) => {
  Course.find({}, (err, courses) => {
    if (err) throw err;

    res.send(courses);
  });
};

// Create and save a course
const add = (title, sessions = []) => {
  // validation and sanitization

  // creating and saving
  const course = new Course({ title, sessions });

  course.save((err, savedCourse) => {
    if (err) return console.error(err);

    return console.log(`Successfully saved course: ${savedCourse}`);
  });
};

module.exports = { index, add };
