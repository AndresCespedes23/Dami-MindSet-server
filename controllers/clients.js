const fs = require("fs");
let clients = JSON.parse(fs.readFileSync("./data/clients.json"));

//CLIENT LIST
const getAll = (req, res) => {
  return res.status(200).json(clients);
};

const getById = (req, res) => {
  const client = clients.find((client) => client.id === req.params.id);
  if (client) return res.status(200).json(client);
  return res.status(404).send("Client not found");
};

const getByName = (req, res) => {
  const client = clients.find((client) => client.name === req.params.name);
  if (client) return res.status(200).json(client);
  return res.status(404).send("Client not found");
};

const getByPhoneNumber = (req, res) => {
  const client = clients.find(
    (client) => client.PhoneNumber === req.params.PhoneNumber
  );
  if (client) return res.status(200).json(client);
  return res.status(404).send("Client not found");
};

const getByCuit = (req, res) => {
  const client = clients.find((client) => client.cuit === req.params.cuit);
  if (client) return res.status(200).json(client);
  return res.status(404).send("Client not found");
};

const getByAddress = (req, res) => {
  const client = clients.find(
    (client) => client.address === req.params.address
  );
  if (client) return res.status(200).json(client);
  return res.status(404).send("Client not found");
};

const getByActivity = (req, res) => {
  const client = clients.find(
    (client) => client.activity === req.params.activity
  );
  if (client) return res.status(200).json(client);
  return res.status(404).send("Client not found");
};

//CLIENT REMOVE
const remove = (req, res) => {
  const client = clients.find((client) => client.id === req.params.id);
  if (client) {
    const filteredClients = clients.filter(
      (client) => client.id !== req.params.id
    );
    clients = filteredClients;
    return res.status(200).json(clients);
  }
  return res.status(404).send("Client not found");
};

//CLIENT UPDATE
const update = (req, res) => {
  const client = clients.find((client) => client.id === req.params.id);
  const index = clients.findIndex((client) => client.id === req.params.id);
  if (client) {
    client.id = req.query.id || client.id;
    client.name = req.query.name || client.name;
    client.email = req.query.email || client.email;
    client.address = req.query.address || client.address;
    client.phoneNumber = req.query.phoneNumber || client.phoneNumber;
    client.activity = req.query.activity || client.activity;
    client.cuit = req.query.cuit || client.cuit;
    clients[index] = client;
    return res.status(200).json(client);
  }
  return res.status(404).send("Client not found");
};

//CLIENT CREATE
const create = (req, res) => {
  if (
    !req.query.name ||
    !req.query.email ||
    !req.query.phoneNumber ||
    !req.query.cuit ||
    !req.query.address ||
    !req.query.activity
  )
    return res.status(400).send("Some parameters are missing");
  const newClient = {
    id: (clients.length + 1).toString(),
    name: req.query.name,
    email: req.query.email,
    phoneNumber: req.query.phoneNumber,
    cuit: req.query.cuit,
    address: req.query.address,
    activity: req.query.activity,
  };
  clients.push(newClient);
  res.status(201).json(clients);
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
  update: update,
  create: create,
};
