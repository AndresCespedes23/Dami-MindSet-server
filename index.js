const express = require('express');
const app = express();
const port = 3000;

const adminsController = require('./controllers/admins');

app.set('json spaces', 2);

app.get('/', (req, res) => {
  res.send('Welcome to MindSet!');
});

//ADMIN
app.get('/admins', adminsController.getAll);
app.get('/admins/byId/:id', adminsController.getById);
app.get('/admins/byName/:name', adminsController.getByName);

app.listen(port, () => {
  console.log(`MindSet server listening at http://localhost:${port}`);
});