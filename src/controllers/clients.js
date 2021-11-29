const Clients = require("../models/clients");

// CLIENT LIST
const getAll = (req, res) => {
  Clients.find({ isDeleted: false })
    .then((clients) => res.status(200).json(clients))
    .catch((err) => res.status(404).json(err));
};

const getById = (req, res) => {
  Clients.findById(req.params.id)
    .then((client) => res.status(200).json(client))
    .catch((err) => res.status(404).json(err));
};

// CLIENT REMOVE
const remove = (req, res) => {
  const { id } = req.params;
  Clients.findOneAndUpdate(
    { _id: id },
    { isDeleted: true },
    { new: true },
    (err, deletedClient) => {
      if (deletedClient === null) {
        return res.status(404).json({
          msg: `Client with id: ${req.params.id} was not found.`,
        });
      }
      if (err) return res.status(400).json(err.message);
      return res.status(200).json(deletedClient);
    },
  );
};

const activate = (req, res) => {
  Clients.findByIdAndUpdate(
    req.params.id,
    { isDeleted: false },
    { new: true },
    (err, activatedClient) => {
      if (err) return res.status(400).json(err);
      return res.status(200).json(activatedClient);
    },
  );
};

// CLIENT UPDATE
const update = (req, res) => {
  const { id } = req.params;
  const client = req.body;
  Clients.findOneAndUpdate(
    { _id: id },
    client,
    { new: true, runValidators: true },
    (err, updatedClient) => {
      if (updatedClient === null) {
        return res.status(404).json({
          msg: `Client with id: ${req.params.id} was not found.`,
        });
      }
      if (err) return res.status(400).json(err.message);
      return res.status(200).json(updatedClient);
    },
  );
};

// CLIENT CREATE
const create = (req, res) => {
  const newClient = new Clients(req.body);
  newClient
    .save()
    .then((clientDoc) => res.status(201).json(clientDoc))
    .catch((err) => res.status(400).json(err.message));
};

module.exports = {
  getAll,
  getById,
  remove,
  activate,
  update,
  create,
};
