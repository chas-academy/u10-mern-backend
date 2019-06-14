const express = require('express');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const https = require('https');
require('dotenv').config();

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

// require('./utils/saveCourses.js');

app.use(require('./routes/auth'));
app.use('/api', require('./routes/user'));
app.use('/api', require('./routes/course'));

app.use((req, res) => {
  res.writeHead(200);
  res.end('Hello, World!\n');
});

https.createServer(null, app).listen(process.env.PORT || 8080);
