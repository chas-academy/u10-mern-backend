require('mocha'); // For getting mocha typings/intellisense
const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const Course = require('../src/models/course.model');
const CourseController = require('../src/controllers/course.controller.js');

/* eslint-env node, mocha */
/* eslint-disable no-unused-expressions */

chai.use(sinonChai);

describe('Mocha', () => {
  it('should run our tests using npm', () => {
    expect(true).to.be.ok;
  });
});

// This is not testing the whole routes and connected middleware, only testing CourseController
describe('Course Controller Functions', () => {
  afterEach(() => sinon.restore());

  const fakeCourses = [
    {
      id: 1,
      name: 'Relaxation Station',
      sessions: [],
    },
    {
      id: 2,
      name: 'Mindfulness Marathon',
      sessions: [
        {
          id: 1,
          title: 'Breathing Exercise',
          duration: 60,
          filePath: '/some/file/path.mp3',
        },
      ],
    },
  ];

  describe('GET /courses', () => {
    beforeEach(() => sinon.stub(Course, 'find'));

    it('should respond with array containing all courses', () => {
      const expectedArray = fakeCourses;

      // This feeds the given arguments to the cb in Course.find()
      Course.find.yields(null, expectedArray);

      const req = {};
      const res = {};
      res.send = sinon.stub().returns(res);
      res.status = sinon.stub().returns(res);

      CourseController.index(req, res);

      // expect res.send to be called with expectedArray
      expect(res.send).to.be.calledOnceWith(expectedArray);
      expect(res.status).to.be.calledOnceWith(200);
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

    it('should respond with a given course object', () => {
      const expectedObject = fakeCourses[0];

      // This feeds the given arguments to the cb in Course.findById()
      Course.findById.yields(null, expectedObject);

      const req = { params: { id: fakeCourses[0].id } };
      const res = { send: sinon.stub() };

      res.status = sinon.stub().returns(res);
      res.send = sinon.stub().returns(res);

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

  describe('POST /courses', () => {
    afterEach(() => sinon.restore());

    it('should respond with created object and a status of 201', () => {
      const expectedObject = fakeCourses[1];

      // fakeCourses[1] but without the ids
      const courseToBeCreated = {
        name: 'Mindfulness Marathon',
        sessions: [
          {
            title: 'Breathing Exercise',
            duration: 60,
            filePath: '/some/file/path.mp3',
          },
        ],
      };

      const req = {
        body: {
          ...courseToBeCreated,
        },
      };

      const res = {};

      sinon.stub(Course.prototype, 'save');

      Course.prototype.save.yields(null, expectedObject);
      // Course.prototype.save.returns(expectedObject);
      // sinon.stub(course, 'save');

      res.status = sinon.stub().returns(res);
      res.set = sinon.stub().returns(res);
      res.send = sinon.stub().returns(res);

      CourseController.add(req, res);
      expect(res.send.firstCall.args[0]).to.eql(expectedObject);
    });
    it('should respond with an error and status of 400 if request is missing something required', () => {
      const error = { message: 'Something was missing in the request' };
      const expectedObject = { error };

      const req = {
        body: {

        },
      };

      const res = {};

      res.status = sinon.stub().returns(res);
      res.set = sinon.stub().returns(res);
      res.send = sinon.stub().returns(res);


      sinon.stub(Course.prototype, 'save');

      Course.prototype.save.yields(error, null);

      CourseController.add(req, res);

      expect(res.status).to.have.been.calledOnceWith(400);
      expect(res.send).to.have.been.calledOnceWith(expectedObject);
    });
  });

  describe('DELETE /courses/:id', () => {
    beforeEach(() => sinon.stub(Course, 'findByIdAndDelete'));

    it('should respond with an empty body and a status of 204', () => {
      const req = { params: { id: fakeCourses[0].id } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.send = sinon.stub().returns(res);

      Course.findByIdAndDelete.yields(null, fakeCourses[0]);

      CourseController.remove(req, res);

      // Expect that res.send() is called without arguments
      expect(res.send.firstCall.args[0]).to.not.exist;
      expect(res.status.firstCall.args[0]).to.equal(204);
    });
    it('should respond with an error and a status of 404 when course is not found', () => {
      const req = { params: { id: 99 } };
      const res = {};

      const expectedObject = {
        error: {
          message: 'No results found',
        },
      };

      res.status = sinon.stub().returns(res);
      res.send = sinon.stub().returns(res);

      // No mongoose errors, but results returned is null
      Course.findByIdAndDelete.yields(null, null);
      CourseController.remove(req, res);

      expect(res.status.firstCall.args[0]).to.equal(404);
      expect(res.send.firstCall.args[0]).to.eql(expectedObject);
    });
    it('should respond with an error and a status of 404 when something went wrong', () => {
      const req = { params: { id: 99 } };
      const res = {};

      const expectedObject = {
        error: {
          message: 'Something went wrong, resource not found',
        },
      };

      res.status = sinon.stub().returns(res);
      res.send = sinon.stub().returns(res);

      Course.findByIdAndDelete.yields(expectedObject.error, null);
      CourseController.remove(req, res);

      expect(res.status.firstCall.args[0]).to.equal(404);
      expect(res.send.firstCall.args[0]).to.eql(expectedObject);
    });
  });

  describe('PATCH /courses/:id', () => {
    beforeEach(() => {
      sinon.stub(Course, 'findOneAndUpdate');
    });
    it('should call Course.findOneAndUpdate with an id and request body as arguments', () => {
      const req = {
        params: {
          id: 1, // Course to update
        },

        body: {
          name: 'New Course Name', // New course that will overwrite old course
        },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.send = sinon.stub().returns(res);

      // set error argument to null for cb
      Course.findOneAndUpdate.yields(null);

      CourseController.update(req, res);

      const { id } = req.params;

      expect(Course.findOneAndUpdate).to.have.been.calledOnceWith({ _id: id }, req.body);
    });
    it('should respond with error and a status of 404 when NOT found', () => {
      const error = {
        message: 'No results found',
      };

      const expectedObject = {
        error,
      };

      const req = {
        params: {
          id: 99,
        },
      };

      const res = {};

      res.status = sinon.stub().returns(res);
      res.send = sinon.stub().returns(res);

      Course.findOneAndUpdate.yields(error);
      CourseController.update(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.send).to.have.been.calledWith(expectedObject);
    });
  });

  describe('PUT /courses/:id', () => {
    beforeEach(() => {
      sinon.stub(Course, 'replaceOne');
    });

    it('should call Course.replaceOne with an id and replacement object as arguments ', () => {
      // fakeCourses[1] but without the ids, will replace another course
      const replacementCourse = {
        name: 'Mindfulness Marathon',
        sessions: [
          {
            title: 'Breathing Exercise',
            duration: 60,
            filePath: '/some/file/path.mp3',
          },
        ],
      };

      const req = {
        params: {
          id: 1, // Course to replace
        },

        body: {
          ...replacementCourse, // New course that will overwrite old course
        },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.send = sinon.stub().returns(res);

      // set error argument to null for cb
      Course.replaceOne.yields(null);

      CourseController.replace(req, res);

      const { id } = req.params;

      expect(Course.replaceOne).to.have.been.calledOnceWith({ _id: id }, replacementCourse);
    });
    it('should respond with error and a status of 404 when NOT found', () => {
      const error = {
        message: 'No results found',
      };

      const expectedObject = {
        error,
      };

      // fakeCourses[1] but without the ids, will replace another course
      const replacementCourse = {
        name: 'Mindfulness Marathon',
        sessions: [
          {
            title: 'Breathing Exercise',
            duration: 60,
            filePath: '/some/file/path.mp3',
          },
        ],
      };

      const req = {
        params: {
          id: 99,
        },

        body: {
          ...replacementCourse, // New course
        },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.send = sinon.stub().returns(res);

      // set error argument to null for cb
      Course.replaceOne.yields(error);

      CourseController.replace(req, res);

      expect(res.status).to.be.calledOnceWith(404);
      expect(res.send).to.be.calledOnceWith(expectedObject);
    });
  });
});
