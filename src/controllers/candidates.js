const fs = require("fs");
let candidates = JSON.parse(fs.readFileSync("./data/candidates.json"));

const Candidates = require("../models/candidates");
const ObjectId = require("mongoose").Types.ObjectId;

const personalInfo = [
  "name",
  "email",
  "gender",
  "address",
  "phoneNumber",
  "dateOfBirth",
  "zipCode",
  "city",
  "state",
  "country",
  "timeRange",
  "status",
  "username",
  "password",
];

const educationInfo = [
  "institution",
  "startDate",
  "finishDate",
  "level",
  "inProgress",
  "title",
];

const workExperienceInfo = [
  "company",
  "role",
  "startDate",
  "finishDate",
  "currently",
  "description",
  "accomplishments",
];

const otherInfo = [
  "description",
  "dni",
  "nationality",
  "maritalStatus",
  "driversLicense",
  "timeRange",
];

const allInfo = [...personalInfo, ...otherInfo];

const getAll = (req, res) => {
  Candidates.find()
    .then((candidates) => {
      return res.status(200).json(candidates);
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

const getById = (req, res) => {
  const candidate = candidates.find(
    (candidate) => candidate.id === req.params.id
  );
  if (!candidate) {
    return res.status(404).json({ Msg: "User not found" });
  }
  res.status(200).json(candidate);
};

const getByName = (req, res) => {
  const candidate = candidates.find(
    (candidate) => candidate.name === req.params.name
  );
  if (!candidate) {
    return res.status(404).json({ Msg: "User not found" });
  }
  res.status(200).json(candidate);
};

const create = (req, res) => {
  const data = req.body;
  const newCandidate = {};
  for (let field = 0; field < personalInfo.length; field++) {
    newCandidate[personalInfo[field]] = data[personalInfo[field]];
  }
  newCandidate.status = "PENDING INTERVIEW";
  Candidates.create(newCandidate);
  res.status(201).json(newCandidate);
};

const addEducation = (req, res) => {
  const data = req.body;
  const newEducation = {};
  for (let field = 0; field < educationInfo.length; field++) {
    newEducation[educationInfo[field]] = data[educationInfo[field]];
  }
  Candidates.findById({ _id: new ObjectId(req.params.id) })
    .then((candidate) => {
      candidate.education.push(newEducation);
      candidate.save();
      res.status(201).json(newEducation);
    })
    .catch((err, candidate) => {
      if (!candidate)
        return res
          .status(404)
          .json({ Msg: `User with id: ${req.params.id} was not found.` });
      return res.status(400).json(err);
    });
};

const addWorkExperience = (req, res) => {
  const data = req.body;
  const newWorkExperience = {};
  for (let field = 0; field < workExperienceInfo.length; field++) {
    newWorkExperience[workExperienceInfo[field]] =
      data[workExperienceInfo[field]];
  }
  Candidates.findById({ _id: new ObjectId(req.params.id) })
    .then((candidate) => {
      candidate.workExperience.push(newWorkExperience);
      candidate.save();
      res.status(201).json(newWorkExperience);
    })
    .catch((err, candidate) => {
      if (!candidate)
        return res
          .status(404)
          .json({ Msg: `User with id: ${req.params.id} was not found.` });
      return res.status(400).json(err);
    });
};

const addOtherInformation = (req, res) => {
  const data = req.body;
  const otherInformation = {};
  for (let field = 0; field < otherInfo.length; field++) {
    otherInformation[otherInfo[field]] = data[otherInfo[field]];
  }
  Candidates.findByIdAndUpdate(
    new ObjectId(req.params.id),
    otherInformation,
    { new: true },
    (err, updatedCandidate) => {
      if (!updatedCandidate) {
        return res.status(404).json({
          msg: `Candidate with id: ${req.params.id} was not found.`,
        });
      }
      if (err) return res.status(400).json(err);
      return res.status(200).json(updatedCandidate);
    }
  );
};

const update = (req, res) => {
  const data = req.body;
  const updatedCandidate = {};
  for (let field = 0; field < allInfo.length; field++) {
    updatedCandidate[allInfo[field]] = data[allInfo[field]];
  }
  Candidates.findByIdAndUpdate(
    new ObjectId(req.params.id),
    updatedCandidate,
    { new: true },
    (err, updatedCandidate) => {
      if (!updatedCandidate) {
        return res.status(404).json({
          msg: `Candidate with id: ${req.params.id} was not found.`,
        });
      }
      if (err) return res.status(400).json(err);
      return res.status(200).json(updatedCandidate);
    }
  );
};

// TODO: create an endpoint in order to update education & workExperience

const remove = (req, res) => {
  const candidate = candidates.find(
    (candidate) => candidate.id === req.params.id
  );
  if (candidate) {
    const candidatesFilter = candidates.filter(
      (candidate) => candidate.id !== req.params.id
    );
    candidates = candidatesFilter;
    return res.status(200).json(candidate);
  }
  res.status(404).json({ Msg: "User not removed" });
};

module.exports = {
  create,
  addEducation,
  addWorkExperience,
  addOtherInformation,
  update,
  remove,
  getAll,
  getById,
  getByName,
};
