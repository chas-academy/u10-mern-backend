const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => console.log('Connection to database successful.'))
  .catch(err => console.log(err));
