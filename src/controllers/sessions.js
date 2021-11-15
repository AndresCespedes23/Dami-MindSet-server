const Sessions = require("../models/sessions");
const ObjectId = require("mongoose").Types.ObjectId;

const create = (req, res) => {
  if (
    !req.body.idPsychologist ||
    !req.body.idCandidate ||
    !req.body.status ||
    !req.body.result
  ) {
    return res.status(400).json({ msg: "Some parameters are missing" });
  }
  const newSession = {
    idPsychologist: new ObjectId(req.body.idPsychologist),
    idCandidate: new ObjectId(req.body.idCandidate),
    status: req.body.status,
    result: req.body.result,
  };

  if (req.body.dateTime) newSession.dateTime = new Date(req.body.dateTime);

  Sessions.create(newSession)
  .then((newSession) => {
    return res.status(201).json(newSession);
  })
  .catch((err) => {
    return res.status(404).json(err);
  });

  // Sessions.create(newSession);
  // res.status(201).json(newSession);
};

const update = (req, res) => {
  if (
    !req.params.id ||
    !req.body.idPsychologist ||
    !req.body.idCandidate ||
    !req.body.status
  ) {
    return res.status(400).json({ msg: "Some parameters are missing" });
  }

  const updatedSession = {
    idPosition: new ObjectId(req.body.idPosition),
    idCandidate: new ObjectId(req.body.idCandidate),
    status: req.body.status,
    result: req.body.result,
  };

  if (req.body.dateTime) updatedSession.dateTime = new Date(req.body.dateTime);

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
