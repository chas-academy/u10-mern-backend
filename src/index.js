const express = require('express');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
require('dotenv').config();

require('./utils/saveCourses.js');

const app = express();
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_ORIGIN,
}));
require('./config/db');
require('./config/passport')(passport);
app.use(require('./routes/root')); // Routes starting from root ('/')
app.use('/api', require('./routes/api')); // Routes starting from '/api'

app.listen(process.env.PORT || 8080);
