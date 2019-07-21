require('mocha'); // For getting mocha typings/intellisense
const { expect } = require('chai');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

// const CourseController = require('../src/controllers/course.controller.js');

/* eslint-env node, mocha */
/* eslint-disable no-unused-expressions */

let mongoServer;
const options = { useNewUrlParser: true };

before((done) => {
  mongoServer = new MongoMemoryServer();
  mongoServer
    .getConnectionString()
    .then(mongoUri => mongoose.connect(mongoUri, options, (err) => {
      if (err) done(err);
    }))
    .then(() => done());
});

after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Mocha', () => {
  it('should run our tests using npm', () => {
    expect(true).to.be.ok;
  });
});

// describe('Course Routes', () => {
//   describe('GET /courses/:id', () => {
//     it('should send a given course object as response', () => {

//     });
//   });
// });
