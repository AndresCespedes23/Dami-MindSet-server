const Profiles = require("../models/profiles");

const getAll = (req, res) => {
  Profiles.find({ isDeleted: false })
    .then((data) => res.json({ data }))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const getById = (req, res) => {
  const { id } = req.params;
  Profiles.findOne({ $and: [{ _id: id }, { isDeleted: false }] })
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `Profile not found by ID: ${id}` });
      return res.json({ data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const search = (req, res) => {
  const { name } = req.query;
  Profiles.find({ name })
    .then((data) => {
      if (data.length === 0) return res.status(404).json({ msg: `Profile not found by name: ${name}` });
      return res.json({ data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const create = (req, res) => {
  const newProfile = {
    name: req.body.name,
    description: req.body.description,
  };
  Profiles.create(newProfile)
    .then((data) => res.json({ msg: "Profile added: ", data }))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const update = (req, res) => {
  const { id } = req.params;
  Profiles.findByIdAndUpdate(id, req.body, { new: true })
    .then((data) => {
      if (data.length === 0) return res.status(404).json({ msg: `Profile not found by ID: ${id}` });
      return res.json({ msg: "Profile updated", data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const remove = (req, res) => {
  const { id } = req.params;
  Profiles.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
    .then((data) => {
      if (data.length === 0) return res.status(404).json({ msg: `Profile not found by ID: ${id}` });
      return res.json({ msg: "Profile deleted", data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const activate = (req, res) => {
  const { id } = req.params;
  Profiles.findByIdAndUpdate(id, { isDeleted: false }, { new: true })
    .then((data) => {
      if (data.length === 0) return res.status(404).json({ msg: `Profile not found by ID: ${id}` });
      return res.json({ msg: "Profile activate", data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

// Module Exports
module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  activate,
  search,
};
