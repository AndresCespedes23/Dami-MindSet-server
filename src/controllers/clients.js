const Clients = require("../models/clients");

const getAll = (req, res) => {
  Clients.find({ isDeleted: false })
    .then((data) => res.json({ data }))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const getById = (req, res) => {
  const { id } = req.params;
  Clients.findOne({ $and: [{ _id: id }, { isDeleted: false }] })
    .then((data) => {
      if (!data) return res.status(404).json({ message: `Client not found with ID: ${id}` });
      return res.json({ data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const remove = (req, res) => {
  const { id } = req.params;
  Clients.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
    .then((found) => {
      if (!found) return res.status(404).json({ message: `Client not found with ID ${id}` });
      return res.json({ message: "Client deleted", data: found });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const activate = (req, res) => {
  const { id } = req.params;
  Clients.findByIdAndUpdate(id, { isDeleted: false }, { new: true })
    .then((found) => {
      if (!found) return res.status(404).json({ message: `Client not found with ID ${id}` });
      return res.status.json({ message: "Client activated", data: found });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const update = (req, res) => {
  const { id } = req.params;
  const client = req.body;
  Clients.findByIdAndUpdate(id, client, { new: true })
    .then((found) => {
      if (!found) return res.status(404).json({ message: `Client not found with ID ${id}` });
      return res.json({ message: "Client updated", data: found });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const create = (req, res) => {
  const newClient = new Clients(req.body);
  newClient
    .save()
    .then((client) => res.json({ message: "Client added", data: client }))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const search = (req, res) => {
  const name = req.query.name || null;
  if (!name) return res.status(400).json({ msg: "Missing query param: name" });
  return Clients.find({ name })
    .then((data) => {
      if (data.length === 0) return res.status(404).json({ msg: `Clients not found by name: ${name}` });
      return res.json({ data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

module.exports = {
  getAll,
  getById,
  remove,
  activate,
  update,
  create,
  search,
};
