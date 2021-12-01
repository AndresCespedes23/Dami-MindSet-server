const Applications = require("../models/applications");

const getAll = (req, res) => {
  Applications.find({ isDeleted: false })
    .populate("idPosition", "name description")
    .populate("idCandidate", "name")
    .populate("idInterview", "dateTime status")
    .then((applications) => res.json({ applications }))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const getById = (req, res) => {
  const { id } = req.params;
  Applications.findOne({ $and: [{ _id: id }, { isDeleted: false }] })
    .populate("idPosition", "name description")
    .populate("idCandidate", "name")
    .populate("idInterview", "dateTime status")
    .then((application) => {
      if (!application) return res.status(404).json({ msg: `Application not found by ID: ${id}` });
      return res.json({ application });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const create = (req, res) => {
  const newApplication = new Applications({
    idPosition: req.body.idPosition,
    idCandidate: req.body.idCandidate,
    idInterview: req.body.idInterview,
    result: req.body.result,
    status: req.body.status,
  });
  if (req.body.dateTime) newApplication.dateTime = new Date(req.body.dateTime);
  newApplication
    .save()
    .then((application) => res.json({ success: "Application added", application }))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const update = (req, res) => {
  const { id } = req.params;
  const updatedApplication = {
    idPosition: req.body.idPosition,
    idCandidate: req.body.idCandidate,
    idInterview: req.body.idInterview,
    result: req.body.result,
    status: req.body.status,
  };
  if (req.body.dateTime) updatedApplication.dateTime = new Date(req.body.dateTime);
  Applications.findByIdAndUpdate(id, updatedApplication, { new: true })
    .populate("idPosition", "name description")
    .populate("idCandidate", "name")
    .populate("idInterview", "dateTime status")
    .then((application) => {
      if (!application) return res.status(404).json({ msg: `Application not found by ID: ${id}` });
      return res.json({ success: "Application updated", application });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const remove = (req, res) => {
  const { id } = req.params;
  Applications.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
    .populate("idPosition", "name description")
    .populate("idCandidate", "name")
    .populate("idInterview", "dateTime status")
    .then((application) => {
      if (!application) return res.status(404).json({ msg: `Application not found by ID: ${id}` });
      return res.json({ success: "Application removed", application });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const activate = (req, res) => {
  const { id } = req.params;
  Applications.findByIdAndUpdate(id, { isDeleted: false }, { new: true })
    .populate("idPosition", "name description")
    .populate("idCandidate", "name")
    .populate("idInterview", "dateTime status")
    .then((application) => {
      if (!application) return res.status(404).json({ msg: `Application not found by ID: ${id}` });
      return res.json({ success: "Application activated", application });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

module.exports = {
  getAll,
  getById,
  update,
  create,
  remove,
  activate,
};
