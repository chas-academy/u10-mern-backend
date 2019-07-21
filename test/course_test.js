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

  describe('GET /courses/:id', () => {
    it('should send a response containing a given course object', () => {
      sinon.stub(Course, 'findById');
      const expectedObject = fakeCourses[0];

      // This feeds the given arguments to the cb in Course.findById()
      Course.findById.yields(null, expectedObject);

      const req = { params: { id: expectedObject.id } };
      const res = { send: sinon.stub() };

      CourseController.get(req, res);

      // expect res.send to be called with expectedObject
      expect(res.send.firstCall.args[0]).to.eql(expectedObject);
    });
  });
});
