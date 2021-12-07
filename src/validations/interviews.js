/* eslint-disable consistent-return */
const required = (req, res, next) => {
  if (
    !req.body.idCandidate
    || !req.body.idClient
    || !req.body.idPosition
    || !req.body.status
  ) {
    return res.status(400).json({ msg: "Some Parameters are missing" });
  }
  next();
};

const validate = (req, res, next) => {
  const { idCandidate } = req.body;
  const { idClient } = req.body;
  const { idPosition } = req.body;
  const { status } = req.body;
  if (idCandidate) {
    if (idCandidate.search(/[a-z]/) < 0) return res.status(400).json({ msg: "idCandidate must have one letter at least" });
    if (idCandidate.search(/[0-9]/) < 0) return res.status(400).json({ msg: "idCandidate must have one number at least" });
  }
  if (idClient) {
    if (idClient.search(/[a-z]/) < 0) return res.status(400).json({ msg: "idClient must have one letter at least" });
    if (idClient.search(/[0-9]/) < 0) return res.status(400).json({ msg: "idClient must have one number at least" });
  }
  if (idPosition) {
    if (idPosition.search(/[a-z]/) < 0) return res.status(400).json({ msg: "idPosition must have one letter at least" });
    if (idPosition.search(/[0-9]/) < 0) return res.status(400).json({ msg: "idPosition must have one number at least" });
  }
  if (status !== "DONE" && status !== "PENDING") {
    return res.status(400).json({ msg: "Status must be DONE or PENDING" });
  }
  next();
};

module.exports = {
  required,
  validate,
};
