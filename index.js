const express = require('express');
const app = express();
const port = 3000;
const clientsController = require('./controllers/clients');

app.get('/', (req, res) => {
  res.send('Welcome to MindSet!')
});

//CLIENTS//LIST
app.get('/clients', clientsController.getAll);
app.get('/clients/byId/:id', clientsController.getById);
app.get('/clients/byName/:name', clientsController.getByName);
app.get('/clients/byphoneNumber/:phoneNumber', clientsController.getByphoneNumber);
app.get('/clients/byCuit/:cuit', clientsController.getByCuit);
app.get('/clients/byAddress/:address', clientsController.getByAddress);
app.get('/clients/byActivity/:activity', clientsController.getByActivity);
//CLIENTS//UPDATE


app.listen(port, () => {
  console.log(`MindSet server listening at http://localhost:${port}`)
}); 
