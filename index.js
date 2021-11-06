const express = require('express');
const app = express();
const port = 3000;


app.get('/', (req, res) => {
  res.send('Welcome to MindSet!');
});
app.listen(port, () => {
  console.log(`MindSet server listening at http://localhost:${port}`);
});