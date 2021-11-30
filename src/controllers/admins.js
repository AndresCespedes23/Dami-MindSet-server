const Admins = require("../models/admins");

const getAll = (req, res) => {
  Admins.find()
    .then((admins) => res.status(200).json(admins))
    .catch((err) => res.status(404).json(err));
};

const getById = (req, res) => {
  Admins.findById(req.params.id)
    .then((admin) => res.status(200).json(admin))
    .catch((err) => res.status(404).json(err));
};
const getByName = (req, res) => {
  Admins.find({ name: req.params.name })
    .then((admin) => res.status(200).json(admin))
    .catch((err) => res.status(404).json(err));
};

const remove = (req, res) => {
  Admins.findByIdAndRemove(req.params.id)
    .then((removeAdmin) => res.status(200).json(removeAdmin))
    .catch((error) => res.status(400).json(error));
};

const update = (req, res) => {
  const { id } = req.params;
  Admins.findByIdAndUpdate(id, req.body, { new: true })
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `Admin with id: ${req.params.id} was not found.` });
      return res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const create = (req, res) => {
  const newAdmin = {
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  };
  Admins.create(newAdmin)
    .then((adminNew) => res.status(201).json(adminNew))
    .catch((error) => res.status(400).json(error));
};

module.exports = {
  getAll,
  getById,
  getByName,
  update,
  remove,
  create,
};
