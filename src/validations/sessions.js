const required = (req, res, next) => {
  if (
    !req.body.idPsychologist ||
    !req.body.idCandidate ||
    //!req.body.dateTime ||
    !req.body.status ||
    !req.body.result
  ) {
    return res.status(400).json({ Msg: "Some parameters are missing" });
  }
  next();
};

const validate = (req, res, next) => {
  const idPsychologist = req.body.idPsychologist;
  const idCandidate = req.body.idCandidate;
  //const dateTime = req.body.dateTime;
  const status = req.body.status;
  const result = req.body.result;
  if (idPsychologist) {
    if (idPsychologist.length !== 24)
      return res.status(400).json("idPsychologist must be 24 characters");
    if (idPsychologist.search(/[a-z]/) < 0)
      return res.status(400).json("idPsychologist must have at least 1 letter");
    if (idPsychologist.search(/[0-9]/) < 0)
      return res.status(400).json("idPsychologist must have at least 1 number");
  }
  if (idCandidate) {
    if (typeof idCandidate !== "object")
      return res.status(400).json("idCandidate must be an array. Add [].");
    for (let i = 0; i < idCandidate.length; i++) {
      if (idCandidate[i].length !== 24)
        return res.status(400).json("idCandidate must be 24 characters");
      if (idCandidate[i].search(/[a-z]/) < 0)
        return res.status(400).json("idCandidate must have at least 1 letter");
      if (idCandidate[i].search(/[0-9]/) < 0)
        return res.status(400).json("idCandidate must have at least 1 number");
    }
  }
  if (status !== "DONE" && status !== "PENDING") {
    return res.status(400).json("Status must be DONE or PENDING");
  }
  if (result) {
    if (result.length > 5000)
      return res
        .status(400)
        .json("Result must have equal or less than 5000 characters");
  }
  next();
};

module.exports = {
  required,
  validate,
};
