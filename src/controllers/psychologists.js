const Psychologists = require("../models/psychologists");

const create = (req, res) => {
  const newPsychologist = {
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber,
    enrollmentNumber: req.body.enrollmentNumber,
    status: true,
  };
  if (req.body.dayRange) newPsychologist.dayRange = req.body.dayRange;
  if (req.body.timeRange) newPsychologist.timeRange = req.body.timeRange;

  Psychologists.create(newPsychologist)
    .then((psychologistDoc) => res.status(201).json(psychologistDoc))
    .catch((error) => res.status(400).json(error));
};

const update = (req, res) => {
  Psychologists.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      phoneNumber: req.body.phoneNumber,
      enrollmentNumber: req.body.enrollmentNumber,
      status: req.body.status,
      dayRange: req.body.dayRange,
      timeRange: req.body.timeRange,
    },
    { new: true },
    (error, newPsychologist) => {
      if (error) {
        res.status(400).json(error);
      }
      return res.status(200).json(newPsychologist);
    },
  );
};

const remove = (req, res) => {
  Psychologists.findByIdAndUpdate(
    req.params.id,
    { isDeleted: true },
    { new: true },
    (error, deletedPsychologist) => {
      if (error) {
        res.status(400).json(error);
      }
      return res.status(200).json(deletedPsychologist);
    },
  );
};

const activate = (req, res) => {
  Psychologists.findByIdAndUpdate(
    req.params.id,
    { isDeleted: false },
    { new: true },
    (error, activatedPsychologist) => {
      if (error) {
        res.status(400).json(error);
      }
      return res.status(200).json(activatedPsychologist);
    },
  );
};

const getAll = (req, res) => {
  Psychologists.find()
    .then((psychologist) => res.status(200).json(psychologist))
    .catch((error) => res.status(400).json(error));
};

const getById = (req, res) => {
  Psychologists.findById(req.params.id)
    .then((psychologist) => res.status(200).json(psychologist))
    .catch((error) => res.status(400).json(error));
};

const getByName = (req, res) => {
  Psychologists.find({ name: req.params.name })
    .then((psychologist) => res.status(200).json(psychologist))
    .catch((error) => res.status(400).json(error));
};

module.exports = {
  create,
  update,
  getAll,
  getById,
  getByName,
  remove,
  activate,
};
