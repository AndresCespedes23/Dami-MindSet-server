const express = require('express');
const app = express();
const port = 3000;
const adminsController = require('./controllers/admins');
const positionsController = require('./controllers/positions.js');
const sessionsController = require('./controllers/sessions.js');

app.set('json spaces', 2);

app.get('/', (req, res) => {
  res.send('Welcome to MindSet!');
});

//ADMIN
app.get('/admins', adminsController.getAll);
app.get('/admins/byId/:id', adminsController.getById);
app.get('/admins/byName/:name', adminsController.getByName);

// POSITIONS
app.get('/positions', positionsController.getAll);
app.get('/positions/byId/:id', positionsController.getById);
app.get('/positions/byName/:name', positionsController.getByName);

//SESSIONS
app.get('/sessions/create', sessionsController.create);
app.get('/sessions/update/:id', sessionsController.update);

app.listen(port, () => {
  console.log(`MindSet server listening at http://localhost:${port}`);
});