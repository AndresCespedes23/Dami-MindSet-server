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

const remove = (req, res) => {
  const client = clients.find((client) => client.id === req.params.id);
  if (client) {
    const clientsFilter = clients.filter((client) => client.id !== req.params.id);
    clients = clientsFilter;
    res.json({client,clients});
  } 
  res.send("Client not found");
};

module.exports = {
  getAll: getAll,
  getById: getById,
  getByName: getByName,
  getByPhoneNumber: getByPhoneNumber,
  getByCuit: getByCuit,
  getByAddress: getByAddress,
  getByActivity: getByActivity,
  remove: remove,
};
