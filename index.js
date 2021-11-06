const express = require('express');
const app = express();
const port = 3000;
const profilesController = require('./controllers/profiles.js');


// PROFILES
app.get('/profiles', profilesController.getAll);
app.get('/profiles/create', profilesController.create);

app.get('/', (req, res) => {
  res.send('Welcome to MindSet!')
});

app.listen(port, () => {
  console.log(`MindSet server listening at http://localhost:${port}`)
});
