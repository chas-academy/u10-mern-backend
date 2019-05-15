const fs = require('fs');
const path = require('path');
const util = require('util');

// Goal: Return object containing all courses including their lessons

const directory = './courses';

// Creates an object for each session, containing information about the session
// Takes in an array of sessions
function structureSessions(sessions, callback) {
  const structuredSessions = [];

  let itemsProcessed = 0;

  sessions.forEach((session) => {
    itemsProcessed += 1;

    const sessionObj = {
      title: path.basename(session, path.extname(session)),
      filePath: path.resolve(session),
      imgSrc: '',
      duration: '',
    };

    structuredSessions.push(sessionObj);

    if (itemsProcessed === sessions.length) {
      callback(structuredSessions);
    }
  });
}

// Creates an array with objects representing the courses in a given directory
// Takes in a directory containing a subdirectory for each course
function coursesData(dir, callback) {
  // 1. Create empty array for courses
  const courses = [];
  // 2. Read courses directories
  fs.readdir(dir, (error, files) => {
    let itemsProcessed = 0;

    files.forEach((file, index) => {
      // 3. Add one object per course
      courses.push({
        name: file,
        sessions: [],
      });

      const coursePath = path.join(dir, file);

      // 4. Read directory of this course's sessions
      fs.readdir(coursePath, (err, sessions) => {
        itemsProcessed += 1;

        // 5. Create structured session objects with session meta data
        structureSessions(sessions, (structuredSessions) => {
          courses[index].sessions = structuredSessions;

          // 6. When done, send courses to callback
          if (itemsProcessed === courses.length) {
            callback(courses);
          }
        });
      });
    });
  });
}


coursesData(directory, (courses) => {
  console.log(util.inspect(courses, { depth: Infinity })); // replace this with call to database
});
