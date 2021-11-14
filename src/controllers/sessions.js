const Sessions = require("../models/sessions");
const ObjectId = require("mongoose").Types.ObjectId;

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

const create = (req, res) => {
  if (
    !req.body.idPsychologist ||
    !req.body.idCandidate ||
    !req.body.idInterview ||
    !req.body.status
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

  Sessions.create(newSession);
  res.status(201).json(newSession);
};

const update = (req, res) => {
  const session = Sessions.find((session) => session.id === req.params.id);
  const selectedSession = Sessions.findIndex(
    (session) => session.id === req.params.id
  );
  if (session) {
    const updateSession = req.query;
    session.idPsychologist =
      updateSession.idPsychologist || session.idPsychologist;
    session.idCandidate = updateSession.idCandidate || session.idCandidate;
    session.dateTime = updateSession.dateTime || session.dateTime;
    session.status = updateSession.status || session.status;
    session.result = updateSession.result || session.result;
    Sessions[selectedSession] = session;
    return res.status(200).json({ msg: "Session updated", session });
  }
  return res
    .status(404)
    .json({ msg: `No session with the id: ${req.params.id}` });
};

const remove = (req, res) => {
  const session = Sessions.findIndex((session) => session.id === req.params.id);
  if (session > -1) {
    const removedSession = Sessions.splice(session, 1);
    res.status(200).json(removedSession);
  }
  res.status(400).json({ msg: `No session with the id: ${req.params.id}` });
};


module.exports = {
  create,
  update,
  remove,
  getAll,
  getById,
  //getByIdPsychologist,
};
