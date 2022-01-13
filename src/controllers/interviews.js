const Interviews = require("../models/interviews");

const create = (req, res) => {
  const newInterview = {
    idCandidate: req.body.idCandidate,
    idClient: req.body.idClient,
    idPosition: req.body.idPosition,
    status: req.body.status,
  };
  if (req.body.dateTime) newInterview.dateTime = new Date(req.body.dateTime);
  Interviews.create(newInterview)
    .then((data) => res.json({ msg: "Interview added", data }))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const update = (req, res) => {
  const { id } = req.params;
  const updateInterview = {
    idCandidate: req.body.idCandidate,
    idClient: req.body.idClient,
    idPosition: req.body.idPosition,
    status: req.body.status,
  };
  if (req.body.dateTime) updateInterview.dateTime = new Date(req.body.dateTime);
  return Interviews.findByIdAndUpdate(id, updateInterview, { new: true })
    .populate("idCandidate", "name")
    .populate("idClient", "name")
    .populate("idPosition", "name")
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `Interview not found by ID: ${id}` });
      return res.json({ msg: "Interview updated", data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const remove = (req, res) => {
  const { id } = req.params;
  Interviews.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
    .populate("idCandidate", "name")
    .populate("idClient", "name")
    .populate("idPosition", "name")
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `Interview not found by ID: ${id}` });
      return res.json({ msg: "Interview deleted", data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const activate = (req, res) => {
  const { id } = req.params;
  Interviews.findByIdAndUpdate(id, { isDeleted: false }, { new: true })
    .populate("idCandidate", "name")
    .populate("idClient", "name")
    .populate("idPosition", "name")
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `Interview not found by ID: ${id}` });
      return res.json({ msg: "Interview activated", data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const getAll = (req, res) => {
  Interviews.find({ isDeleted: false })
    .populate("idCandidate", "name")
    .populate("idClient", "name")
    .populate("idPosition", "name")
    .then((data) => res.json({ data }))
    .catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
};

const getById = (req, res) => {
  const { id } = req.params;
  Interviews.findOne({ $and: [{ _id: id }, { isDeleted: false }] })
    .populate("idCandidate", "name")
    .populate("idClient", "name")
    .populate("idPosition", "name address city postalCode description")
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `Interview not found by ID: ${id}` });
      return res.json({ data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const getPending = (req, res) => {
  const { id } = req.params;
  Interviews.find(
    { $and: [{ idCandidate: id }, { isDeleted: false }, { dateTime: { $gt: new Date() } }] },
  )
    .populate("idCandidate", "name")
    .populate("idClient", "name")
    .populate("idPosition", "name")
    .then((data) => res.json({ data }))
    .catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
};
const getCompleted = (req, res) => {
  const { id } = req.params;
  Interviews.find(
    { $and: [{ idCandidate: id }, { isDeleted: false }, { dateTime: { $lt: new Date() } }] },
  )
    .populate("idCandidate", "name")
    .populate("idClient", "name")
    .populate("idPosition", "name")
    .then((data) => res.json({ data }))
    .catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
};
module.exports = {
  create,
  update,
  remove,
  activate,
  getAll,
  getById,
  getPending,
  getCompleted,
};
