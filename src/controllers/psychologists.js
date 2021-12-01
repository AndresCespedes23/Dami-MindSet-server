const Psychologists = require("../models/psychologists");

const create = (req, res) => {
  const newPsychologist = {
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber,
    enrollmentNumber: req.body.enrollmentNumber,
    status: req.body.status,
  };
  if (req.body.dayRange) newPsychologist.dayRange = req.body.dayRange;
  if (req.body.timeRange) newPsychologist.timeRange = req.body.timeRange;
  Psychologists.create(newPsychologist)
    .then((psychologist) => res.json({ msg: "Psychologist added", psychologist }))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const update = (req, res) => {
  const { id } = req.params;
  Psychologists.findByIdAndUpdate(id, req.body, { new: true })
    .then((psychologist) => {
      if (!psychologist) return res.status(404).json({ msg: `Psychologist not found by ID: ${id}` });
      return res.json({ msg: "Psychologist updated", psychologist });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const remove = (req, res) => {
  const { id } = req.params;
  Psychologists.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
    .then((psychologist) => {
      if (!psychologist) return res.status(404).json({ msg: `Psychologist not found by ID: ${id}` });
      return res.json({ msg: "Psychologist deleted", psychologist });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const activate = (req, res) => {
  const { id } = req.params;
  Psychologists.findByIdAndUpdate(id, { isDeleted: false }, { new: true })
    .then((psychologist) => {
      if (!psychologist) return res.status(404).json({ msg: `Psychologist not found by ID: ${id}` });
      return res.json({ msg: "Psychologist activated", psychologist });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const getAll = (req, res) => {
  Psychologists.find({ isDeleted: false })
    .then((data) => res.json({ data }))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const getById = (req, res) => {
  const { id } = req.params;
  Psychologists.findById(id)
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `Psychologist not found by ID: ${id}` });
      return res.json({ data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const search = (req, res) => {
  const { text } = req.query;
  Psychologists.find({ firstName: text })
    .then((psychologists) => {
      if (psychologists.length === 0) return res.status(404).json({ msg: `Psychologist not found by Name: ${text}` });
      return res.json({ psychologists });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

module.exports = {
  create,
  update,
  getAll,
  getById,
  search,
  remove,
  activate,
};
