const fs = require("fs");
let candidates = JSON.parse(fs.readFileSync("./data/candidates.json"));

const Candidates = require("../models/candidates");
// const ObjectId = require("mongoose").Types.ObjectId;

const personalInformation = [
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
    return res.status(404).send("User not found");
  }
  res.status(200).json(candidate);
};

const getByName = (req, res) => {
  const candidate = candidates.find(
    (candidate) => candidate.name === req.params.name
  );
  if (!candidate) {
    return res.status(404).send("User not found");
  }
  res.status(200).json(candidate);
};

const create = (req, res) => {
  const newInformation = req.body;
  const newCandidate = {};
  for (let field = 0; field < personalInformation.length; field++) {
    newCandidate[personalInformation[field]] =
      newInformation[personalInformation[field]];
  }
  newCandidate.status = "PENDING INTERVIEW";
  Candidates.create(newCandidate);
  res.status(201).json(newCandidate);
};

// TODO: create an endpoint in order to update education & workExperience
const update = (req, res) => {
  const candidate = candidates.find(
    (candidate) => candidate.id === req.params.id
  );
  const index = candidates.findIndex(
    (candidate) => candidate.id === req.params.id
  );
  const newInformation = req.query;
  if (candidate) {
    candidate.name = newInformation.name || candidate.name;
    candidate.email = newInformation.email || candidate.email;
    candidate.gender = newInformation.gender || candidate.gender;
    candidate.address = newInformation.address || candidate.address;
    candidate.phoneNumber = newInformation.phoneNumber || candidate.phoneNumber;
    candidate.dni = newInformation.dni || candidate.dni;
    candidate.dateOfBirth = newInformation.dateOfBirth || candidate.dateOfBirth;
    candidate.city = newInformation.city || candidate.city;
    candidate.state = newInformation.state || candidate.state;
    candidate.country = newInformation.country || candidate.country;
    candidate.timeRange = newInformation.timeRange || candidate.timeRange;
    candidate.status = newInformation.status || candidate.status;
    candidate.username = newInformation.username || candidate.username;
    candidate.password = newInformation.password || candidate.password;
    // For simplicity we're momentarily using the position in the array to select which education or work experience info to modify.
    // This will be refactored in the API Rest update
    if (newInformation.idEducation) {
      const id = newInformation.idEducation;
      candidate.education[id] = {
        institution:
          newInformation.institution || candidate.education[id].institution,
        startDate:
          newInformation.startDate || candidate.education[id].startDate,
        finishDate:
          newInformation.finishDate || candidate.education[id].finishDate,
        level: newInformation.level || candidate.education[id].level,
        inProgress:
          newInformation.inProgress || candidate.education[id].inProgress,
        title: newInformation.title || candidate.education[id].title,
      };
    }
    if (newInformation.idWorkExp) {
      const id = newInformation.idWorkExp;
      candidate.workExperience[id] = {
        company: newInformation.company || candidate.workExperience[id].company,
        role: newInformation.role || candidate.workExperience[id].role,
        workStartDate:
          newInformation.workStartDate ||
          candidate.workExperience[id].workStartDate,
        workFinishDate:
          newInformation.workFinishDate ||
          candidate.workExperience[id].workFinishDate,
        currently:
          newInformation.currently || candidate.workExperience[id].currently,
        workDescription:
          newInformation.workDescription ||
          candidate.workExperience[id].workDescription,
        accomplishments:
          newInformation.accomplishments ||
          candidate.workExperience[id].accomplishments,
      };
    }
    candidate.description = newInformation.description || candidate.description;
    candidate.nationality = newInformation.nationality || candidate.nationality;
    candidate.maritalStatus =
      newInformation.maritalStatus || candidate.maritalStatus;
    candidate.driversLicense =
      newInformation.driversLicense || candidate.driversLicense;
    candidates[index] = candidate;
    return res.status(200).json(candidate);
  }
  res.status(404).json({ Msg: "User doesn't exist" });
};

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
  update,
  remove,
  getAll,
  getById,
  getByName,
};
