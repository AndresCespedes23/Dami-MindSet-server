const Psychologists = require("../models/psychologists");

const create = (req, res) => {
  const newPsychologist = {
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber,
    enrollmentNumber: req.body.enrollmentNumber,
    status: req.body.status === "true",
  };
  if (req.body.dayRange) newPsychologist.dayRange = req.body.dayRange;
  if (req.body.timeRange) newPsychologist.timeRange = req.body.timeRange;

  Psychologists.create(newPsychologist)
    .then((newPsychologist) => {
      res.status(201).json(newPsychologist);
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
};

const update = (req, res) => {
  const updatedPsychologist = {
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber,
    enrollmentNumber: req.body.enrollmentNumber,
    status: req.body.status === "true",
  };
  if (req.body.dayRange) updatedPsychologist.dayRange = req.body.dayRange;
  if (req.body.timeRange) updatedPsychologist.timeRange = req.body.timeRange;

  Psychologists.findByIdAndUpdate(
    req.params.id,
    updatedPsychologist,
    { new: true },
    (error, updatedPsychologist) => {
      if (!updatedPsychologist)
        return res.status(404).json({
          msg: `Application with id: ${req.params.id} was not found.`,
        });
      if (error) return res.status(400).json(error);
      return res.status(200).json(updatedPsychologist);
    }
  );
};

const remove = (req, res) => {
  Psychologists.findByIdAndRemove(req.params.id)
    .then((removePsychologist) => {
      res.status(200).json(removePsychologist);
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
};

const getAll = (req, res) => {
  Psychologists.find()
    .then((psychologist) => {
      res.status(200).json(psychologist);
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
};

const getById = (req, res) => {
  Psychologists.findById(req.params.id)
    .then((psychologist) => {
      return res.status(200).json(psychologist);
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
};

const getByName = (req, res) => {
  Psychologists.find({ name: req.params.name })
    .then((psychologist) => {
      return res.status(200).json(psychologist);
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
};

module.exports = {
  create,
  update,
  getAll,
  getById,
  getByName,
  remove,
};
