/* eslint-disable consistent-return */
const required = (req, res, next) => {
  if (
    !req.body.idPsychologist
    || !req.body.idCandidate
    || !req.body.date
    || !req.body.status
  ) {
    return res.status(400).json({ msg: "Parameter/s missing" });
  }
  next();
};

const validateUpdate = (req, res, next) => {
  const { idPsychologist } = req.body;
  const { idCandidate } = req.body;
  const { status } = req.body;
  const { result } = req.body;
  if (idPsychologist) {
    if (idPsychologist._id.length !== 24) return res.status(400).json({ msg: "idPsychologist must be 24 characters" });
    if (idPsychologist._id.search(/[a-z]/) < 0) return res.status(400).json({ msg: "idPsychologist must have at least 1 letter" });
    if (idPsychologist._id.search(/[0-9]/) < 0) return res.status(400).json({ msg: "idPsychologist must have at least 1 number" });
  }
  if (idCandidate) {
    if (idCandidate._id.length !== 24) return res.status(400).json({ msg: "idCandidate must be 24 characters" });
    if (idCandidate._id.search(/[a-z]/) < 0) return res.status(400).json({ msg: "idCandidate must have at least 1 letter" });
    if (idCandidate._id.search(/[0-9]/) < 0) return res.status(400).json({ msg: "idCandidate must have at least 1 number" });
  }
  if (status) {
    if (status !== "DONE" && status !== "PENDING") {
      return res.status(400).json({ msg: "Status must be DONE or PENDING" });
    }
  }
  if (result) {
    if (result.length > 500) {
      return res
        .status(400)
        .json({ msg: "Result must have equal or less than 500 characters" });
    }
  }
  next();
};

const validateAdd = (req, res, next) => {
  const { idPsychologist } = req.body;
  const { idCandidate } = req.body;
  const { status } = req.body;
  const { result } = req.body;
  if (idPsychologist) {
    if (idPsychologist.length !== 24) return res.status(400).json({ msg: "idPsychologist must be 24 characters" });
    if (idPsychologist.search(/[a-z]/) < 0) return res.status(400).json({ msg: "idPsychologist must have at least 1 letter" });
    if (idPsychologist.search(/[0-9]/) < 0) return res.status(400).json({ msg: "idPsychologist must have at least 1 number" });
  }
  if (idCandidate) {
    if (idCandidate.length !== 24) return res.status(400).json({ msg: "idCandidate must be 24 characters" });
    if (idCandidate.search(/[a-z]/) < 0) return res.status(400).json({ msg: "idCandidate must have at least 1 letter" });
    if (idCandidate.search(/[0-9]/) < 0) return res.status(400).json({ msg: "idCandidate must have at least 1 number" });
  }
  if (status) {
    if (status !== "DONE" && status !== "PENDING") {
      return res.status(400).json({ msg: "Status must be DONE or PENDING" });
    }
  }
  if (result) {
    if (result.length > 500) {
      return res
        .status(400)
        .json({ msg: "Result must have equal or less than 500 characters" });
    }
  }
  next();
};

module.exports = {
  required,
  validateAdd,
  validateUpdate,
};
