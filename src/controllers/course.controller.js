const Course = require('../models/course.model');

const index = (res) => {
  Course.find({}, (err, courses) => {
    if (err) throw err;

    res.send(courses);
  });
};

module.exports = { index };
