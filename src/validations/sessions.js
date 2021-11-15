const required = (req, res, next) => {
  if (
    !req.body.idPsychologist ||
    !req.body.idCandidate ||
    !req.body.dateTime ||
    !req.body.status
    //!req.body.result
  ) {
    return res.status(400).json({ Msg: "Parameter/s missing" });
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
    if (idCandidate.length !== 24)
      return res.status(400).json("idCandidate must be 24 characters");
    if (idCandidate.search(/[a-z]/) < 0)
      return res.status(400).json("idCandidate must have at least 1 letter");
    if (idCandidate.search(/[0-9]/) < 0)
      return res.status(400).json("idCandidate must have at least 1 number");
  }
  // if (dateTime) {
  //   if (dateTime instanceof Date) {return true;}
  //   return res.status(400).json("DateTime format error");
  // }
  if (status) {
    if (status !== "DONE" && status !== "PENDING") {
      return res.status(400).json("Status must be DONE or PENDING");
    }
  }
  if (result) {
    if (result.length > 500)
      return res
        .status(400)
        .json("Result must have equal or less than 500 characters");
  }
  next();
};

module.exports = {
  required,
  validate,
};
