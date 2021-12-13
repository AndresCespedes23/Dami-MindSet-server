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
  console.log(req.body);
  if (req.body.timeStart) newPsychologist.timeStart = req.body.timeStart;
  if (req.body.timeEnd) newPsychologist.timeEnd = req.body.timeEnd;
  if (req.body.dayStart) newPsychologist.dayStart = req.body.dayStart;
  if (req.body.dayEnd) newPsychologist.dayEnd = req.body.dayEnd;
  Psychologists.create(newPsychologist)
    .then((psychologist) => res.json({ msg: "Psychologist added", data: psychologist }))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const update = (req, res) => {
  const { id } = req.params;
  Psychologists.findByIdAndUpdate(id, req.body, { new: true })
    .then((psychologist) => {
      if (!psychologist) return res.status(404).json({ msg: `Psychologist not found by ID: ${id}` });
      return res.json({ msg: "Psychologist updated", data: psychologist });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const remove = (req, res) => {
  const { id } = req.params;
  Psychologists.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
    .then((psychologist) => {
      if (!psychologist) return res.status(404).json({ msg: `Psychologist not found by ID: ${id}` });
      return res.json({ msg: "Psychologist deleted", data: psychologist });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const activate = (req, res) => {
  const { id } = req.params;
  Psychologists.findByIdAndUpdate(id, { isDeleted: false }, { new: true })
    .then((psychologist) => {
      if (!psychologist) return res.status(404).json({ msg: `Psychologist not found by ID: ${id}` });
      return res.json({ msg: "Psychologist activated", data: psychologist });
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
      return res.json({ data: psychologists });
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
