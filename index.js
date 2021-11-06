const express = require('express');
const app = express();
const port = 3000;
const psychologistController = require('./controllers/psychologists');

app.get('/', (req, res) => {
  res.send('Welcome to MindSet!');
});

//PSYCHOLOGISTS
app.get('/psychologists', psychologistController.create);

app.listen(port, () => {
  console.log(`MindSet server listening at http://localhost:${port}`);
});