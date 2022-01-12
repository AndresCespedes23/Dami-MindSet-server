const Sessions = require("../models/sessions");
const Psychologists = require("../models/psychologists");

const getAll = (req, res) => {
  Sessions.find({ isDeleted: false })
    .populate("idPsychologist", "name")
    .populate("idCandidate", "name")
    .then((data) => res.json({ data }))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const getById = (req, res) => {
  const { id } = req.params;
  Sessions.findOne({ $and: [{ _id: id }, { isDeleted: false }] })
    .populate("idPsychologist")
    .populate("idCandidate")
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `Session not found by ID: ${id}` });
      return res.json({ data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const create = (req, res) => {
  const newSession = {
    idPsychologist: req.body.idPsychologist,
    idCandidate: req.body.idCandidate,
    date: req.body.date,
    time: req.body.time,
    status: req.body.status,
    result: req.body.result || [],
  };
  Sessions.create(newSession)
    .then((data) => res.json({ msg: "Session added", data }))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const update = (req, res) => {
  const { id } = req.params;
  const updatedSession = {
    idPsychologist: req.body.idPsychologist,
    idCandidate: req.body.idCandidate,
    date: req.body.date,
    time: req.body.time,
    status: req.body.status,
    result: req.body.result,
  };
  Sessions.findByIdAndUpdate(id, updatedSession, { new: true })
    .populate("idPsychologist")
    .populate("idCandidate")
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `Session not found by ID: ${id}` });
      return res.json({ msg: "Session updated", data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const remove = (req, res) => {
  const { id } = req.params;
  Sessions.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
    .populate("idPsychologist")
    .populate("idCandidate")
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `Session not found by ID: ${id}` });
      return res.json({ msg: "Session deleted", data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const activate = (req, res) => {
  const { id } = req.params;
  Sessions.findByIdAndUpdate(id, { isDeleted: false }, { new: true })
    .populate("idPsychologist")
    .populate("idCandidate")
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `Session not found by ID: ${id}` });
      return res.json({ msg: "Session activated", data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const getAvailable = async (req, res) => {
  const { id } = req.params;
  const psychologistSessions = await Sessions.find({
    $and: [{ idPsychologist: id }, { isDeleted: false }],
  });
  const psychologist = await Psychologists.findById(id);
  // 1- Crear calendario del psychologist (15 días)
  console.log(psychologist);
  console.log(psychologistSessions);
  // 2- filtrar por las sessiones que ya tiene
  // 3- quitar las menores a ahora
  // .then((data) => res.json({ data }))
  // .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
  res.json({
    data: [],
  });
};
module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  activate,
  getAvailable,
};
