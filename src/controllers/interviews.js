const { ObjectId } = require("mongoose").Types;
const Interviews = require("../models/interviews");

const create = (req, res) => {
  if (
    !req.body.idCandidate
    || !req.body.idClient
    || !req.body.idPosition
    || !req.body.status
  ) {
    return res.status(400).json({ msg: "Some Parameters are missing" });
  }
  const newInterview = {
    idCandidate: new ObjectId(req.body.idCandidate),
    idClient: new ObjectId(req.body.idClient),
    idPosition: new ObjectId(req.body.idPosition),
    status: req.body.status,
  };

  if (req.body.dateTime) newInterview.dateTime = new Date(req.body.dateTime);

  Interviews.create(newInterview);
  return res.status(201).json(newInterview);
};

const update = (req, res) => {
  if (
    !req.params.id
    || !req.body.idCandidate
    || !req.body.idClient
    || !req.body.idPosition
    || !req.body.status
  ) {
    return res.status(400).json({ msg: "Some Parameters are missing" });
  }
  const updateInterview = {
    idCandidate: new ObjectId(req.body.idCandidate),
    idClient: new ObjectId(req.body.idClient),
    idPosition: new ObjectId(req.body.idPosition),
    status: req.body.status,
  };

  if (req.body.dateTime) updateInterview.dateTime = new Date(req.body.dateTime);

  return Interviews.findByIdAndUpdate(
    new ObjectId(req.params.id),
    updateInterview,
    { new: true },
    (err, interviewDoc) => {
      if (!interviewDoc) {
        return res.status(404).json({
          msg: `Interview with the Id: ${req.params.id} was not found.`,
        });
      }
      if (err) return res.status(400).json(err);
      return res.status(200).json(interviewDoc);
    },
  ).populate("idCandidate", "name").populate("idClient", "name").populate("idPosition", "name");
};

const remove = (req, res) => {
  Interviews.findByIdAndUpdate(
    new ObjectId(req.params.id),
    { isDeleted: true },
    { new: true },
    (err, removeInterview) => {
      if (err) return res.status(400).json(err);
      return res.status(200).json(removeInterview);
    },
  ).populate("idCandidate", "name").populate("idClient", "name").populate("idPosition", "name");
};

const activate = (req, res) => {
  Interviews.findByIdAndUpdate(
    new ObjectId(req.params.id),
    { isDeleted: false },
    { new: true },
    (err, activatedInterview) => {
      if (err) return res.status(400).json(err);
      return res.status(200).json(activatedInterview);
    },
  ).populate("idCandidate", "name").populate("idClient", "name").populate("idPosition", "name");
};

const getAll = (req, res) => {
  Interviews.find().populate("idCandidate", "name").populate("idClient", "name").populate("idPosition", "name")
    .then((interviews) => res.status(200).json(interviews))
    .catch((err) => res.status(404).json(err));
};

const getById = (req, res) => {
  Interviews.findById({ _id: new ObjectId(req.params.id) }).populate("idCandidate", "name").populate("idClient", "name").populate("idPosition", "name")
    .then((interview) => res.status(200).json(interview))
    .catch((err) => res.status(400).json(err));
};

module.exports = {
  create,
  update,
  remove,
  activate,
  getAll,
  getById,
};
