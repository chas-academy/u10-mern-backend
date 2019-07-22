require('mocha'); // For getting mocha typings/intellisense
const { expect } = require('chai');
const sinon = require('sinon');

const Course = require('../src/models/course.model');
const CourseController = require('../src/controllers/course.controller.js');

/* eslint-env node, mocha */
/* eslint-disable no-unused-expressions */

describe('Mocha', () => {
  it('should run our tests using npm', () => {
    expect(true).to.be.ok;
  });
});

describe('Course Routes', () => {
  const fakeCourses = [
    {
      id: 1,
      name: 'Relaxation Station',
      sessions: [],
    },
    {
      id: 2,
      name: 'Mindfulness Marathon',
      sessions: [],
    },
  ];

  describe('GET /courses', () => {
    beforeEach(() => sinon.stub(Course, 'find'));
    afterEach(() => sinon.restore());

    it('should respond with array containing all courses', () => {
      const expectedArray = fakeCourses;

      // This feeds the given arguments to the cb in Course.find()
      Course.find.yields(null, expectedArray);

      const req = {};
      const res = { send: sinon.stub() };

      CourseController.index(req, res);

      // expect res.send to be called with expectedArray
      expect(res.send.firstCall.args[0]).to.eql(expectedArray);
    });

    it('should respond with a 404 status and error message if courses are NOT found', () => {
      const error = {
        message: 'Something went wrong',
      };
      const expectedObject = {
        error,
      };

      // This feeds the given arguments to the cb in Course.find()
      Course.find.yields(error, null);

      // Ask for an id that does not have a corresponding object
      const req = {};
      const res = {};

      // Stub and add return value so that we can test chained res methods
      res.status = sinon.stub().returns(res);
      res.send = sinon.stub().returns(res);

      CourseController.index(req, res);

      // expect res.status to be set to 404
      expect(res.status.firstCall.args[0]).to.equal(404);
      expect(res.send.firstCall.args[0]).to.eql(expectedObject);
    });
  });

  describe('GET /courses/:id', () => {
    beforeEach(() => sinon.stub(Course, 'findById'));
    afterEach(() => sinon.restore());

    it('should respond with a given course object', () => {
      const expectedObject = fakeCourses[0];

      // This feeds the given arguments to the cb in Course.findById()
      Course.findById.yields(null, expectedObject);

      const req = { params: { id: fakeCourses[0].id } };
      const res = { send: sinon.stub() };

      CourseController.get(req, res);

      // expect res.send to be called with expectedObject
      expect(res.send.firstCall.args[0]).to.eql(expectedObject);
    });

    it('should respond with a 404 status and error message if course is NOT found', () => {
      const error = {
        message: 'Something went wrong',
      };
      const expectedObject = {
        error,
      };

      // This feeds the given arguments to the cb in Course.findById()
      Course.findById.yields(error, null);

      // Ask for an id that does not have a corresponding object
      const req = { params: { id: 99 } };
      const res = {};

      // Stub and add return value so that we can test chained res methods
      res.status = sinon.stub().returns(res);
      res.send = sinon.stub().returns(res);

      CourseController.get(req, res);

      // expect res.status to be set to 404
      expect(res.status.firstCall.args[0]).to.equal(404);
      expect(res.send.firstCall.args[0]).to.eql(expectedObject);
    });
  });
});
