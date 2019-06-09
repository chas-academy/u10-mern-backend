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

// Update a specific course (PATCH)
const update = async (req, res) => {
  await Course.findOneAndUpdate({ _id: req.params.id }, req.body, (err) => {
    if (err) console.error(err);
  });

  Course.findById(req.params.id, (err, course) => {
    if (err) {
      return console.error(err.message);
    }
    return res.send(course);
  });
};

// Replace a specific course (PUT)
const replace = (req, res) => {
  Course.replaceOne({ _id: req.params.id }, req.body, (err) => {
    if (err) console.error(err);

    res.send(Course.findById(req.params.id, (error, course) => {
      if (err) {
        return console.error(error.message);
      }
      return res.send(course);
    }));
  });
};

module.exports = {
  index, add, get, remove, update, replace,
};
