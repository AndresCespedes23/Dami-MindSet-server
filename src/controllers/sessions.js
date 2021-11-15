const Sessions = require("../models/sessions");
const ObjectId = require("mongoose").Types.ObjectId;

const create = (req, res) => {
  const newSession = {
    idPsychologist: new ObjectId(req.body.idPsychologist),
    idCandidate: new ObjectId(req.body.idCandidate),
    dateTime: req.body.dateTime,
    status: req.body.status,
    result: req.body.result,
  };

  Sessions.create(newSession);
  res.status(201).json(newSession);
};

const update = (req, res) => {
  const updatedSession = {
    idPosition: new ObjectId(req.body.idPosition),
    idCandidate: new ObjectId(req.body.idCandidate),
    dateTime: req.body.dateTime,
    status: req.body.status,
    result: req.body.result,
  };

  Sessions.findByIdAndUpdate(
    new ObjectId(req.params.id),
    updatedSession,
    { new: true },
    (err, updatedSession) => {
      if (!updatedSession)
        return res.status(404).json({
          msg: `Session with id: ${req.params.id} was not found.`,
        });
      if (err) return res.status(400).json(err);
      return res.status(200).json(updatedSession);
    }
  );
};

const remove = (req, res) => {
  Sessions.findByIdAndRemove(
    new ObjectId(req.params.id),
    (err, removedSession) => {
      if (err) return res.status(400).json(err);
      return res.status(200).json(removedSession._id);
    }
  );
};

const getAll = (req, res) => {
  Sessions.find()
    .then((sessions) => {
      return res.status(200).json(sessions);
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

const getById = (req, res) => {
  Sessions.findById({ _id: new ObjectId(req.params.id) })
    .then((session) => {
      return res.status(200).json(session);
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

const getByIdPsychologist = (req, res) => {
  Sessions.findById({ _id: new ObjectId(req.params.id) })
    .then((session) => {
      return res.status(200).json(session);
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

const getByIdCandidate = (req, res) => {
  Sessions.findById({ _id: new ObjectId(req.params.id) })
    .then((session) => {
      return res.status(200).json(session);
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

module.exports = {
  getAll,
  getById,
  getByIdPsychologist,
  getByIdCandidate,
  create,
  update,
  remove,
};
