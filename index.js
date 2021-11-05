const express = require('express');
const app = express();
const port = 3000;

const admins = require('./controllers/admins');

app.set('json spaces', 2);

app.get('/', (req, res) => {
  res.send('Welcome to MindSet!')
});

//ADMIN
app.get('/admins/list', admins.getAll);
app.get('/admins/list/:id', admins.getById);

app.listen(port, () => {
  console.log(`MindSet server listening at http://localhost:${port}`)
});