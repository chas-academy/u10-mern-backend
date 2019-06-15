// const Session = require('../models/session.model');


/*
// Get a session by id
const get = (req, res) => {
  const id = req.params.session_id;

  Session.findById(id, (err, session) => {
    if (err) {
      console.error(err.message);
      return res.status(404).send('Resource not found');
    }
    return res.send(session);
  });
};
*/

/*
// Create and save a new session
const add = (title, duration, filePath) => {
  // Validate and sanitize

  // Create and save
  const session = new Session({ title, duration, filePath });

  session.save((err, savedSession) => {
    if (err) return console.error(err);

    return console.log(`Successfully saved session: ${savedSession}`);
  });
};
*/

module.exports = { };
