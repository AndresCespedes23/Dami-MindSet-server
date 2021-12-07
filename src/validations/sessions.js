/* eslint-disable consistent-return */
const required = (req, res, next) => {
  if (
    !req.body.idPsychologist
    || !req.body.idCandidate
    || !req.body.dateTime
    || !req.body.status
  ) {
    return res.status(400).json({ msg: "Parameter/s missing" });
  }
  next();
};

const validate = (req, res, next) => {
  const { idPsychologist } = req.body;
  const { idCandidate } = req.body;
  const { dateTime } = req.body;
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
  if (dateTime) {
    const formatTime = /^([1-2][0-9][0-9][0-9])-([0]{0,1}[1-9]|1[012])-([1-9]|([012][0-9])|(3[01]))T[0-2][0-9]:[0-9][0-9]/;
    if (!formatTime.test(dateTime)) {
      return res
        .status(400)
        .json({ msg: "Dateand Time format yyyy-MM-ddThh:mm:ss.000Z" });
    }
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
