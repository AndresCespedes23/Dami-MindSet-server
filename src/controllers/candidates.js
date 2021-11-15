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

const allInfo = [...personalInfo, ...otherInfo, "status", "profiles"];

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
  Candidates.findById(new ObjectId(req.params.id))
    .then((candidate) => {
      return res.status(200).json(candidate);
    })
    .catch((err, candidate) => {
      if (!candidate)
        return res
          .status(404)
          .json({ Msg: `User with name: ${req.params.name} was not found.` });
      return res.status(400).json(err);
    });
};

const getByName = (req, res) => {
  Candidates.findOne({ name: req.params.name })
  .then((candidate) => {
    return res.status(200).json(candidate);
  })
  .catch((err, candidate) => {
    if (!candidate)
      return res
        .status(404)
        .json({ Msg: `User with id: ${req.params.id} was not found.` });
    return res.status(400).json(err);
  });
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
  Candidates.findById(new ObjectId(req.params.id))
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
  Candidates.findById(new ObjectId(req.params.id))
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

const updateEducation = (req, res) => {
  const data = req.body;
  const updatedInformation = {};
  for (let field = 0; field < educationInfo.length; field++) {
    updatedInformation[educationInfo[field]] = data[educationInfo[field]];
  }
  Candidates.findOne({ "education._id": new ObjectId(req.params.id) })
    .then((candidate) => {
      const education = candidate.education.id(new ObjectId(req.params.id));
      console.log(education);
      for (let field in education) {
        education[field] = data[field] || education[field];
      }
      console.log(education);
      console.log(candidate.education.id(new ObjectId(req.params.id)));
      //candidate.education.id(new ObjectId(req.params.id)).remove();
      //candidate.education.push(education);
      candidate.save();
      res.json(education);
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
  /*
  Candidates.findOneAndUpdate(
    { "education._id": new ObjectId(req.params.id) },
    updatedInformation,
    (err, updatedInformation) => {
      if (!updatedInformation) {
        return res.status(404).json({
          msg: `Information with id: ${req.params.id} was not found.`,
        });
      }
      if (err) return res.status(400).json(err);
      return res.status(200).json(updatedInformation);
    }
  );
  */
};

// TODO: create an endpoint in order to update education & workExperience

const remove = (req, res) => {
  Candidates.information.findByIdAndDelete(
    new ObjectId(req.params.id),
    (err, removedCandidate) => {
      if (!removedCandidate) {
        return res.status(404).json({
          msg: `Candidate with id: ${req.params.id} was not found.`,
        });
      }
      if (err) return res.status(400).json(err);
      return res.status(200).json(removedCandidate);
    }
  );
};

module.exports = {
  getAll,
  getById,
  getByName,
  create,
  addEducation,
  addWorkExperience,
  addOtherInformation,
  update,
  updateEducation,
  remove,
  personalInfo,
  educationInfo,
  workExperienceInfo,
  otherInfo,
  allInfo,
};
