const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Welcome to MindSet!')
});

// MS26-POSITIONS - List Positions
const positionsM = require('./controllers/positions.js');

app.get('/positions', positionsM.getAll );
app.get('/positions/byId/:id', positionsM.getById);
app.get('/positions/byName/:name', positionsM.getByName);



app.listen(port, () => {
  console.log(`MindSet server listening at http://localhost:${port}`)
});