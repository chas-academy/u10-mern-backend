const Course = require('../models/course/index.js');

const index = (res) => {
  Course.find({}, (err, courses) => {
    if (err) throw err;

    res.send(courses);
  });
};

module.exports = { index };
