const Clients = require("../models/clients");

//CLIENT LIST
const getAll = (req, res) => {
  Clients.find()
    .then((clients) => {
      return res.status(200).json(clients);
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

const getById = (req, res) => {
  Clients.findById(req.params.id)
    .then((client) => {
      return res.status(200).json(client);
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

//CLIENT REMOVE
const remove = (req, res) => {
  Clients.findByIdAndRemove(req.params.id, (err, removedClient) => {
    if (err) return res.status(400).json(err);
    return res.status(200).json(removedClient);
  });
};

//CLIENT UPDATE
const update = (req, res) => {
  const updatedClient = {
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    cuit: req.body.cuit,
    address: req.body.address,
    activity: req.body.activity,
  };

  Clients.findByIdAndUpdate(
    req.params.id,
    updatedClient,
    { new: true },
    (err, updatedClient) => {
      if (!updatedClient)
        return res.status(404).json({
          msg: `Client with id: ${req.params.id} was not found.`,
        });
      if (err) return res.status(400).json(err);
      return res.status(200).json(updatedClient);
    }
  );
};

//CLIENT CREATE
const create = (req, res) => {
  const newClient = {
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    cuit: req.body.cuit,
    address: req.body.address,
    activity: req.body.activity,
  };
  Clients.create(newClient);
  res.status(201).json(newClient);
};

module.exports = {
  getAll,
  getById,
  remove,
  update,
  create,
};

//THESE FUNCTIONS WONT BE USED FOR NOW
// const getByName = (req, res) => {
//   const client = Clients.find((client) => client.name === req.params.name);
//   if (client) return res.status(200).json(client);
//   return res.status(404).send("Client not found");
// };

// const getByPhoneNumber = (req, res) => {
//   const client = Clients.find(
//     (client) => client.PhoneNumber === req.params.PhoneNumber
//   );
//   if (client) return res.status(200).json(client);
//   return res.status(404).send("Client not found");
// };

// const getByCuit = (req, res) => {
//   const client = Clients.find((client) => client.cuit === req.params.cuit);
//   if (client) return res.status(200).json(client);
//   return res.status(404).send("Client not found");
// };

// const getByAddress = (req, res) => {
//   const client = Clients.find(
//     (client) => client.address === req.params.address
//   );
//   if (client) return res.status(200).json(client);
//   return res.status(404).send("Client not found");
// };

// const getByActivity = (req, res) => {
//   const client = Clients.find(
//     (client) => client.activity === req.params.activity
//   );
//   if (client) return res.status(200).json(client);
//   return res.status(404).send("Client not found");
// };
