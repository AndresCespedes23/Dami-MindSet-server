const fs = require("fs");
const clients = JSON.parse(fs.readFileSync("./data/clients.json"));

//CLIENT LIST///

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

//CLIENT//UPDATE
/*const editAdmin = (req, res) => {
  const adminIndex = Admins.findIndex((item) => item.id === req.query.id)
  if (adminIndex !== -1) {
    Admins[adminIndex] = {
      id: Admins[adminIndex].id,
      first_name: req.query.first_name || Admins[adminIndex].first_name,
      last_name: req.query.last_name || Admins[adminIndex].last_name,
      user_name: req.query.user_name || Admins[adminIndex].user_name,
      email: req.query.email || Admins[adminIndex].email,
      password: req.query.password || Admins[adminIndex].password,
    }
    fs.writeFile('./data/admins.json', JSON.stringify(Admins), {}, (error) => {
      if (error) {
        res.status(400).send(error)
      } else {
        res.status(201).json(Admins[adminIndex])
      }
    })
  } else {
    res.status(404).send("Admin not found")
  }}*/

module.exports = {
  getAll: getAll,
  getById: getById,
  getByName: getByName,
  getByPhoneNumber: getByPhoneNumber,
  getByCuit: getByCuit,
  getByAddress: getByAddress,
  getByActivity: getByActivity,
};
