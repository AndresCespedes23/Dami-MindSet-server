const required = (req, res, next) => {
  if (!req.body.idPosition) {
    return res.status(400).json({ msg: "Position is required" });
  }
  if (!req.body.idCandidate) {
    return res.status(400).json({ msg: "Candidate is required" });
  }
  if (!req.body.idInterview) {
    return res.status(400).json({ msg: "Interview name is required" });
  }
  return next();
};

module.exports = {
  required,
};
