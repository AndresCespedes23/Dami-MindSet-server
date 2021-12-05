const { ObjectId } = require("mongoose").Types;
const Sessions = require("../models/sessions");

const getAll = (req, res) => {
  Sessions.find({ isDeleted: false }).populate("idPsychologist", "name").populate("idCandidate", "name")
    .then((sessions) => res.status(200).json(sessions))
    .catch((err) => res.status(404).json(err));
};

const getById = (req, res) => {
  Sessions.findOne({ $and: [{ _id: new ObjectId(req.params.id) }, { isDeleted: false }] })
    .then((session) => res.status(200).json(session))
    .catch((err) => res.status(404).json(err));
};

const create = (req, res) => {
  const newSession = {
    idPsychologist: new ObjectId(req.body.idPsychologist),
    idCandidate: new ObjectId(req.body.idCandidate),
    dateTime: new Date(req.body.dateTime),
    status: req.body.status,
    result: req.body.result,
  };
  Sessions.create(newSession)
    .then((sessionDoc) => res.status(201).json(sessionDoc))
    .catch((error) => res.status(400).json(error));
};

const update = (req, res) => {
  const updatedSession = {
    idPsychologist: new ObjectId(req.body.idPsychologist),
    idCandidate: new ObjectId(req.body.idCandidate),
    dateTime: new Date(req.body.dateTime),
    status: req.body.status,
    result: req.body.result,
  };

  Sessions.findByIdAndUpdate(
    new ObjectId(req.params.id),
    updatedSession,
    { new: true },
    (err, sessionDoc) => {
      if (!sessionDoc) {
        return res.status(404).json({
          msg: `Session with id: ${req.params.id} was not found.`,
        });
      }
      if (err) return res.status(404).json(err);
      return res.status(200).json(sessionDoc);
    },
  );
};

const remove = (req, res) => {
  Sessions.findByIdAndUpdate(
    new ObjectId(req.params.id),
    { isDeleted: true },
    { new: true },
    (err, deletedSession) => {
      if (!deletedSession) {
        return res.status(404).json({
          msg: `Session with id: ${req.params.id} was not found.`,
        });
      }
      if (err) return res.status(404).json(err);
      return res.status(200).json(deletedSession);
    },
  );
};

const activate = (req, res) => {
  Sessions.findByIdAndUpdate(
    new ObjectId(req.params.id),
    { isDeleted: false },
    { new: true },
    (err, activatedSession) => {
      if (!activatedSession) {
        return res.status(404).json({
          msg: `Session with id: ${req.params.id} was not found.`,
        });
      }
      if (err) return res.status(404).json(err);
      return res.status(200).json(activatedSession);
    },
  );
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  activate,
};
