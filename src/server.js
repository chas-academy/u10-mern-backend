const express = require('express');

const app = express();
const port = 3000;

app.get('/staging', (req, res) => res.send('Hello Moment 23!!!'));

app.listen(port, () => console.log(`Now listening on port ${port}!`));
