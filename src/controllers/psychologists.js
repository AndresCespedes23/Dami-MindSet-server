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
    .then((newPsychologist) => {
      return res.status(201).json(newPsychologist);
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
};

const update = (req, res) => {
  Psychologists.findById(req.params.id)
    .then((psychologist) => {
      psychologist.name = req.body.name ? req.body.name : psychologist.name;
      psychologist.email = req.body.email ? req.body.email : psychologist.email;
      psychologist.username = req.body.username
        ? req.body.username
        : psychologist.username;
      psychologist.password = req.body.password
        ? req.body.password
        : psychologist.password;
      psychologist.phoneNumber = req.body.phoneNumber
        ? req.body.phoneNumber
        : psychologist.phoneNumber;
      psychologist.enrollmentNumber = req.body.enrollmentNumber
        ? req.body.enrollmentNumber
        : psychologist.enrollmentNumber;
      psychologist.status = req.body.status
        ? req.body.status
        : psychologist.status;
      psychologist.dayRange = req.body.dayRange
        ? req.body.dayRange
        : psychologist.dayRange;
      psychologist.timeRange = req.body.timeRange
        ? req.body.timeRange
        : psychologist.timeRange;

      Psychologists.findByIdAndUpdate(
        req.params.id,
        psychologist,
        { new: true },
        (error, psychologist) => {
          if (!psychologist)
            return res.status(404).json({
              msg: `Application with id: ${req.params.id} was not found.`,
            });
          if (error) return res.status(400).json(error);
          return res.status(200).json(psychologist);
        }
      );
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
};

const remove = (req, res) => {
  Psychologists.findByIdAndRemove(req.params.id)
    .then((removePsychologist) => {
      return res.status(200).json(removePsychologist);
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
};

const getAll = (req, res) => {
  Psychologists.find()
    .then((psychologist) => {
      return res.status(200).json(psychologist);
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
