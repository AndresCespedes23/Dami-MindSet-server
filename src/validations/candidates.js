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
  if (data.inProgress && data.finishDate) {
    return res
      .status(400)
      .json({ Msg: "Current education can't have a finish date" });
  }
  next();
};

const requiredWorkExperience = (req, res, next) => {
  const data = req.body;
  if (
    !data.company ||
    !data.role ||
    !data.startDate ||
    !data.description ||
    data.currently === undefined ||
    (!data.currently && !data.finishDate)
  ) {
    return res.status(400).json({ Msg: "Some parameters are missing" });
  }
  if (data.currently && data.finishDate) {
    return res
      .status(400)
      .json({ Msg: "Current employment can't have a finish date" });
  }
  next();
};

module.exports = {
  requiredPersonalInfo,
  requiredEducation,
  requiredWorkExperience,
};
