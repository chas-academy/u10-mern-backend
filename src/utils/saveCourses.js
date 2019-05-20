const fs = require('fs');
const path = require('path');
const mp3Duration = require('mp3-duration');
const Course = require('../models/course/index.js');
const Session = require('../models/session/index.js');

// This file is for creating and saving course objects to the database.
// The course objects will contain course and session meta data, and is
// retrieved by looking in the directory containing the courses directories.
// Inside each course directory there should be the session mp3 files.


// The directory containing the course directories
const directory = './courses';

// Creates an object for each session, containing information about the session
// Takes in an array of sessions
function structureSessions(sessions, coursePath, callback) {
  // This array will be populated and sent to callback when done
  const structuredSessions = [];

  let itemsProcessed = 0;

  sessions.forEach(async (session) => {
    const sessionObj = {
      title: path.basename(session, path.extname(session)),
      filePath: path.resolve(session),
      imgSrc: '',
      duration: '',
    };

    // Get and set duration of session file
    await mp3Duration(path.join(coursePath, session), (err, duration) => {
      if (err) console.error(err);

      sessionObj.duration = duration;
    });

    structuredSessions.push(sessionObj);

    itemsProcessed += 1;

    if (itemsProcessed === sessions.length) {
      callback(structuredSessions);
    }
  });
}

// Creates an array with objects representing the courses in a given directory
// Takes in a directory containing a subdirectory for each course
function coursesData(dir, callback) {
  // 1. Create empty array for courses
  const coursesArray = [];

  // 2. Read courses directories
  fs.readdir(dir, (err, courses) => {
    if (err) console.error(err);

    let coursesProcessed = 0;

    courses.forEach((course, index) => {
      // 3. Add one object per course
      coursesArray.push({
        name: course,
        sessions: [],
      });

      const coursePath = path.join(dir, course);

      // 4. Read directory of this course's sessions
      fs.readdir(coursePath, async (error, sessions) => {
        if (error) console.error(error);

        // 5. Create structured session objects with session meta data
        await structureSessions(sessions, coursePath, (structuredSessions) => {
          coursesArray[index].sessions = structuredSessions;

          coursesProcessed += 1;

          // 6. When done, send courses to callback
          if (coursesProcessed === coursesArray.length) {
            callback(coursesArray);
          }
        });
      });
    });
  });
}

// Create courses and sessions objects and send them to database
coursesData(directory, (courses) => {
  courses.forEach(async (curCourse) => {
    let tempCourse;

    await curCourse.sessions.forEach((session, index) => {
      tempCourse = curCourse;
      tempCourse.sessions[index] = new Session(session);
    });

    const newCourse = new Course(tempCourse);

    // Check if course already exists in DB
    Course.findOne({ name: newCourse.name }, (err, course) => {
      if (err) console.error(err);

      if (course) {
        console.log(`Document already exists: ${course.name}`);
      } else {
        newCourse.save((error, savedCourse) => {
          if (error) console.error(error);

          console.log(`Save Successful!: ${savedCourse.name}`);
        });
      }
    });
  });
});
