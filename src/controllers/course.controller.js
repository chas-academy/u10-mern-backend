const Course = require('../models/course.model');

const index = (res) => {
  Course.find({}, (err, courses) => {
    if (err) return console.error(err);

    return res.send(courses);
  });
};

// Get a course by id
const get = (req, res) => {
  const { id } = req.params;

  Course.findById(id, (err, course) => {
    if (err) {
      res.status(404).send('Resource not found');
      return console.error(err.message);
    }
    res.send(course);
    return console.log(course);
  });
};

// Create and save a course
const add = (req, res) => {
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

// Delete a specific course from db
const remove = (req, res) => {
  Course.findByIdAndDelete(req.params.id, (err, deletedCourse) => {
    if (err || deletedCourse == null) {
      if (err) console.error(err);

      return res.status(404).send('Resource not found');
    }

    return res.status(200).send(`Deleted course "${deletedCourse.name}"`);
  });
};

module.exports = {
  index, add, get, remove,
};
