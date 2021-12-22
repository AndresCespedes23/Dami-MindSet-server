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

const validate = (req, res, next) => {
  const { idPsychologist } = req.body;
  const { idCandidate } = req.body;
  const { status } = req.body;
  const { result } = req.body;
  if (!idPsychologist) {
    return res.status(400).json({ msg: "idPsychologist is required" });
  }
  if (!idCandidate) {
    return res.status(400).json({ msg: "idCandidate is required" });
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
  validate,
};
