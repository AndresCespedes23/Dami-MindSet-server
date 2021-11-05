const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Welcome to MindSet!')
});

// MS26-POSITIONS - List Positions
const positionsControllers = require('./controllers/positions.js');

app.get('/positions', positionsControllers.getAll);
app.get('/positions/byId/:id', positionsControllers.getById);
app.get('/positions/byName/:name', positionsControllers.getByName);



app.listen(port, () => {
  console.log(`MindSet server listening at http://localhost:${port}`)
});