const express = require('express');
const app = express();
const port = 3000;
const adminsController = require('./controllers/admins');
const positionsController = require('./controllers/positions.js');
const interviewsController = require('./controllers/interviews');
const sessionsController = require('./controllers/sessions.js');

app.set('json spaces', 2);

app.get('/', (req, res) => {
  res.send('Welcome to MindSet!');
});

//INTERVIEWS
app.get('/interviews/create', interviewsController.create);
app.get('/interviews/update/:id', interviewsController.update);
app.get('/interviews/cancel/:id', interviewsController.cancel);
app.get('/interviews', interviewsController.getAll);
app.get('/interviews/byId/:id', interviewsController.getById);


//ADMIN
app.get('/admins', adminsController.getAll);
app.get('/admins/byId/:id', adminsController.getById);
app.get('/admins/byName/:name', adminsController.getByName);

// POSITIONS
app.get('/positions', positionsController.getAll);
app.get('/positions/byId/:id', positionsController.getById);
app.get('/positions/byName/:name', positionsController.getByName);
app.get('/positions/create', positionsController.create);

//SESSIONS
app.get('/sessions/create', sessionsController.create);
app.get('/sessions/update/:id', sessionsController.update);

app.listen(port, () => {
  console.log(`MindSet server listening at http://localhost:${port}`);
});