const express = require('express');
const interviewsController = require('./controllers/interviews');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Welcome to MindSet!');
});

//INTERVIEWS
app.get('/interviews/create', (req, res) => {
  let interview = interviewsController.create(req.query);
  res.send(`Interview succesfully created! ${JSON.stringify(interview)}`);
})

app.listen(port, () => {
  console.log(`MindSet server listening at http://localhost:${port}`);
});