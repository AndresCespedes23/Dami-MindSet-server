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

const update = (req, res) => {
  const { id } = req.params;
  Admins.findByIdAndUpdate(id, req.body, { new: true })
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `Admin with id: ${req.params.id} was not found.` });
      return res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

module.exports = {
  getAll,
  getById,
  getByName,
  update,
};
