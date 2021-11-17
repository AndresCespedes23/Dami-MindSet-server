const required = (req, res, next) => {
  if (
    !req.params.id ||
    !req.body.idCandidate ||
    !req.body.idClient ||
    !req.body.idPosition ||
    !req.body.status
  ) {
    return res.status(400).json({ msg: "Some Parameters are missing" });
  }
  next();
};

const validate = (req, res, next) => {
  const idCandidate = req.body.idCandidate;
  const idClient = req.body.idClient;
  const idPosition = req.body.idPosition;
  const status = req.body.status;
  if (idCandidate) {
    if (idCandidate.search(/[a-z]/) < 0)
      return res.status(400).json("idCandidate must have one letter at least");
    if (idCandidate.search(/[0-9]/) < 0)
      return res.status(400).json("idCandidate must have one number at least");
  }
  if (idClient) {
    if (idClient.search(/[a-z]/) < 0)
      return res.status(400).json("idClient must have one letter at least");
    if (idClient.search(/[0-9]/) < 0)
      return res.status(400).json("idClient must have one number at least");
  }
  if (idPosition) {
    if (idPosition.search(/[a-z]/) < 0)
      return res.status(400).json("idPosition must have one letter at least");
    if (idPosition.search(/[0-9]/) < 0)
      return res.status(400).json("idPosition must have one number at least");
  }
  if (status !== "IN COURSE" && status !== "FINISHED") {
    return res.status(400).json("Status must be IN COURSE or FINISHED");
  }
  next();
};

module.exports = {
  required,
  validate,
};
