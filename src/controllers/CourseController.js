const Course = require('../models/course/index.js');

// Get all courses
const getCourses = (res) => {
  Course.find({}, (err, courses) => {
    if (err) console.error(err);

    res.send(courses);
  });
};

module.exports = { getCourses };
