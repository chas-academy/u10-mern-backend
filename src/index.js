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
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
  origin: process.env.CLIENT_ORIGIN,
}));
require('./config/db');
require('./config/passport')(passport);
app.use(require('./routes'));

app.listen(process.env.PORT || 8080);
