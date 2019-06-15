const fs = require('fs');

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
const update = (req, res) => {
  Course.findOneAndUpdate({ _id: req.params.id }, req.body, (err) => {
    if (err) {
      console.error(err);
      res.send({ error: { message: err.message } });
    } else {
      Course.findById(req.params.id, (error, course) => {
        if (error) {
          console.error(error.message);
          return res.send({ error: { message: error.message } });
        }
        return res.send(course);
      });
    }
  });
};

// Replace a specific course (PUT)
const replace = (req, res) => {
  Course.replaceOne({ _id: req.params.id }, req.body, (err) => {
    if (err) {
      console.error(err.message);
      return res.send({ error: { message: err.message } });
    }

    return res.send(Course.findById(req.params.id, (error, course) => {
      if (err) {
        console.error(error.message);
        return res.send({ error: { message: err.message } });
      }
      return res.send(course);
    }));
  });
};

const getAudio = (req, res) => {
  // Get course that contains the session
  Course.findById(req.params.course_id, (err, course) => {
    if (err) {
      return res.send(err.message);
    }

    const session = course.sessions.id(req.params.session_id);

    if (!course || !session) {
      return res.status(404).send({ error: { message: 'Resource not found' } });
    }

    // Get audio file path from session document inside the course
    const { filePath } = course.sessions.id(req.params.session_id);

    // Send file as audio stream
    return fs.stat(filePath, (error, stats) => {
      if (error) {
        res.send(error.message);
      } else {
        const total = stats.size;

        // Stream audio from client-selected starting point, else stream from start of file
        if (req.headers.range) {
          const { range } = req.headers;
          const parts = range.replace(/bytes=/, '').split('-');
          const partialStart = parts[0];
          const partialEnd = parts[1];

          const start = parseInt(partialStart, 10);
          const end = partialEnd ? parseInt(partialEnd, 10) : total - 1;
          const chunkSize = (end - start) + 1;
          const readStream = fs.createReadStream(filePath, { start, end });

          res.writeHead(206, {
            'Content-Range': `bytes ${start}-${end}/${total}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkSize,
            'Content-Type': 'audio/mpeg',
          });

          readStream.pipe(res);
        } else {
          res.writeHead(200, { 'Content-Length': total, 'Content-Type': 'audio/mpeg' });
          fs.createReadStream(filePath).pipe(res);
        }
      }
    });
  });
};


module.exports = {
  index, add, get, remove, update, replace, getAudio,
};
