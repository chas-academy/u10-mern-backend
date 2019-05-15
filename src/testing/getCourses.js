const fs = require('fs');
const path = require('path');

// Goal: Return object containing all courses including their lessons

const directory = './courses';

function structureSessions(session) {
  const sessionObj = {
    title: path.basename(session, path.extname(session)),
    filePath: path.resolve(session),
    imgSrc: '',
    duration: '',
  };
  console.log(sessionObj);
}

function newFn(dir, callback) {
  // 1. Create empty array for courses
  const courses = [];
  // 2. Read courses directories
  fs.readdir(directory, (error, files) => {
    let itemsProcessed = 0;
    files.forEach((file, index) => {
      // 3. Add one object per course
      courses.push({
        name: file,
        sessions: [],
      });


      const coursePath = path.join(directory, file);
      // Insert respective sessions array into course objects
      fs.readdir(coursePath, (err, sessions) => {
        itemsProcessed += 1;
        sessions.forEach((session) => {
          structureSessions(session); // Will be used to flesh out sessions
        });
        courses[index].sessions = sessions;
        if (itemsProcessed === courses.length) {
          callback(courses);
        }
      });
    });
  });
}


newFn(directory, (courses) => {
  console.log(courses);
});
