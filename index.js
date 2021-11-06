const express = require('express');
const interviewsController = require('./controllers/interviews');
const app = express();
const port = 3000;
const adminsController = require('./controllers/admins');
const positionsController = require('./controllers/positions.js');

app.set('json spaces', 2);

app.get('/', (req, res) => {
  res.send('Welcome to MindSet!');
});

//INTERVIEWS
app.get('/interviews/create', (req, res) => {
  let interview = interviewsController.create(req.query);
  res.send(`Interview succesfully created! ${JSON.stringify(interview)}`);
})
app.get('/interviews/update', (req, res) => {
  let interview = interviewsController.create(req.query);
  res.send(`Interview succesfully created! ${JSON.stringify(interview)}`);
})

//ADMIN
app.get('/admins', adminsController.getAll);
app.get('/admins/byId/:id', adminsController.getById);
app.get('/admins/byName/:name', adminsController.getByName);

// POSITIONS
app.get('/positions', positionsController.getAll);
app.get('/positions/byId/:id', positionsController.getById);
app.get('/positions/byName/:name', positionsController.getByName);

app.listen(port, () => {
  console.log(`MindSet server listening at http://localhost:${port}`);
});