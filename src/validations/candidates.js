const info = require("../controllers/candidates");
const validations = require("./validations");

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

const requiredOtherInformation = (req, res, next) => {
  const data = req.body;
  if (!data.timeRange) {
    return res.status(400).json({ Msg: "Time Range is missing" });
  }
  next();
};

const validate = (req, res) => {
  const data = req.body;
  let result = [false];
  const fields = [
    ...info.allInfo,
    ...info.educationInfo,
    ...info.workExperienceInfo,
  ];
  console.log(fields);
  for (let i = 0; i < fields.length; i++) {
    console.log(fields[i]);
    if (data[fields[i]]) {
      console.log(data[fields[i]]);
      result = validations[fields[i]](data[fields[i]]);
      if (result[0]) break;
    }
  }
  if (result[0]) {
    return res.status(400).json({ Msj: result[1] });
  }
  return res.status(200).json({ Msj: "Validation passed" });
};

module.exports = {
  requiredPersonalInfo,
  requiredEducation,
  requiredWorkExperience,
  requiredOtherInformation,
  validate,
};
