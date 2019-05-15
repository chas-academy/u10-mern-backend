const fs = require('fs');
const path = require('path');

// Goal: Return object containing all courses including their lessons

const directory = './courses';

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
        // sessions.forEach((session) => {
        //   structureSessions(session); // Will be used to flesh out sessions
        // });
        courses[index].sessions = sessions;
        if (itemsProcessed === courses.length) {
          callback(courses);
        }
      });
    });
  });
}

// function structureSessions(session) {
//   const title = path.basename(session, path.extname(session));
//   const filePath = path.resolve(session);
//   const imgSrc = ''; // Change this later when we have set img directory
//   const duration = ''; // Change this when we have a way to get duration
// }


newFn(directory, (courses) => {
  console.log(courses);
});
