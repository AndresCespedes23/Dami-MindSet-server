const requiredPersonalInfo = (req, res, next) => {
  const data = req.body;
  if (
    !data.name ||
    !data.email ||
    !data.username ||
    !data.password ||
    !data.gender ||
    !data.address ||
    !data.phoneNumber ||
    !data.dateOfBirth ||
    !data.zipCode ||
    !data.city ||
    !data.state ||
    !data.country
  ) {
    return res.status(400).json({ Msg: "Some parameters are missing" });
  }
  next();
};

const requiredEducation = (req, res, next) => {
  const data = req.body;
  if (
    !data.institution ||
    !data.startDate ||
    !data.level ||
    !data.title ||
    data.inProgress === undefined ||
    (!data.inProgress && !data.finishDate)
  ) {
    return res.status(400).json({ Msg: "Some parameters are missing" });
  }
  next();
};

module.exports = {
  requiredPersonalInfo,
  requiredEducation,
};
