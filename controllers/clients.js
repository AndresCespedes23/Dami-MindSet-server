const fs = require("fs");
let clients = JSON.parse(fs.readFileSync("./data/clients.json"));

//CLIENT///

const getAll = (req, res) => {
  res.json(clients);
};

const getById = (req, res) => {
  const client = clients.find((client) => client.id === req.params.id);
  if (client) {
    res.json(client);
  } else {
    res.send("Client not found");
  }
};

const getByName = (req, res) => {
  const client = clients.find((client) => client.name === req.params.name);
  if (client) {
    res.json(client);
  } else {
    res.send("Client not found");
  }
};

const getByPhoneNumber = (req, res) => {
  const client = clients.find(
    (client) => client.PhoneNumber === req.params.PhoneNumber
  );
  if (client) {
    res.json(client);
  } else {
    res.send("Client not found");
  }
};

const getByCuit = (req, res) => {
  const client = clients.find((client) => client.cuit === req.params.cuit);
  if (client) {
    res.json(client);
  } else {
    res.send("Client not found");
  }
};

const getByAddress = (req, res) => {
  const client = clients.find(
    (client) => client.address === req.params.address
  );
  if (client) {
    res.json(client);
  } else {
    res.send("Client not found");
  }
};

const getByActivity = (req, res) => {
  const client = clients.find(
    (client) => client.activity === req.params.activity
  );
  if (client) {
    res.json(client);
  } else {
    res.send("Client not found");
  }
};

//CLIENT REMOVE///

const remove = (req, res) => {
  const client = clients.find((client) => client.id === req.params.id);
  if (client) {
    const filteredClients = clients.filter((client) => client.id !== req.params.id);
    clients = filteredClients
  } res.json(clients)
    res.send("Client not found");
};

//CLIENT//UPDATE

const update = (req, res) => {
  const client = clients.find((client) => client.id === req.params.id);
  const index = clients.findIndex((client) => client.id === req.params.id);
  if (client) {
    client.id = req.query.id ? req.query.id : client.id,
    client.name = req.query.name ? req.query.name : client.name,
    client.email = req.query.email ? req.query.email : client.email,
    client.address = req.query.address ? req.query.address : client.address,
    client.phoneNumber = req.query.phoneNumber ? req.query.phoneNumber : client.phoneNumber,
    client.activity = req.query.activity ? req.query.activity : client.activity,
    client.cuit = req.query.cuit ? req.query.cuit : client.cuit,
    clients[index] = client;
    res.json(client);
  } 
  res.send("Client not updated");
};

//CLIENT CREATE//

const create = (req, res) => {
  const newClient = {
    id: (clients.length + 1).toString(),
    name: req.query.name,
    email: req.query.email,
    phoneNumber: req.query.phoneNumber,
    cuit: req.query.cuit,
    address: req.query.address,
    activity: req.query.activity
  };
  clients.push(newClient);
  res.json(clients);
};
s
module.exports = {
  getAll: getAll,
  getById: getById,
  getByName: getByName,
  getByPhoneNumber: getByPhoneNumber,
  getByCuit: getByCuit,
  getByAddress: getByAddress,
  getByActivity: getByActivity,
  remove: remove,
  update: update,
  create:create,
};
