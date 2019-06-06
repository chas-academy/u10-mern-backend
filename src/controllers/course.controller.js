const Course = require('../models/course.model');

const index = (res) => {
  Course.find({}, (err, courses) => {
    if (err) throw err;

    res.send(courses);
  });
};

// Get a course by id
const get = (req, res) => {
  const { id } = req.params;

  Course.findById(id, (err, course) => {
    if (err) {
      console.error(err.message);
      res.status(404).send('Resource not found');
    }
    res.send(course);
    console.log(course);
  });
};

// Create and save a course
const add = (req, res) => {
  // validation and sanitization

  // creating and saving
  const { name } = req.body;
  const sessions = req.body.sessions || [];

  const course = new Course({ name, sessions });

  course.save((err, savedCourse) => {
    if (err) return console.error(err);

    console.log(`Successfully saved course: ${savedCourse}`);

    res.status(201);
    res.set({ Location: `${process.env.SERVER_URL}/api/courses/${savedCourse._id}` });

    return res.send({
      data: {
        type: 'course',
        ...savedCourse.toObject(),
      },
    });
  });
};

module.exports = { index, add, get };
