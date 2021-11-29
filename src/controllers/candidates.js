const { ObjectId } = require("mongoose").Types;
const Candidates = require("../models/candidates");

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
  "profiles",
];

const allInfo = [...personalInfo, ...otherInfo];

const getAll = (req, res) => {
  Candidates.find({ isDeleted: false }).populate("profiles")
    .then((candidates) => res.status(200).json(candidates))
    .catch((err) => res.status(400).json(err));
};

const getById = (req, res) => {
  Candidates.findById(new ObjectId(req.params.id)).populate("profiles")
    .then((candidate) => {
      if (!candidate) {
        return res
          .status(404)
          .json({ msg: `User with name: ${req.params.name} was not found.` });
      }
      return res.status(200).json(candidate);
    })
    .catch((err) => res.status(400).json(err));
};

const getByName = (req, res) => {
  Candidates.findOne({ name: req.params.name }).populate("profiles")
    .then((candidate) => {
      if (!candidate) {
        return res
          .status(404)
          .json({ msg: `User with id: ${req.params.id} was not found.` });
      }
      return res.status(200).json(candidate);
    })
    .catch((err) => res.status(400).json(err));
};

const create = (req, res) => {
  const data = req.body;
  const newCandidate = {};
  for (let field = 0; field < personalInfo.length; field++) {
    newCandidate[personalInfo[field]] = data[personalInfo[field]];
  }
  newCandidate.status = "PENDING INTERVIEW";
  newCandidate.dni = data.dni;
  Candidates.create(newCandidate)
    .then((candidates) => {
      console.log(candidates);
      res.status(201).json(candidates);
    })
    .catch((err) => res.status(400).json(err));
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
      if (!candidate) {
        return res
          .status(404)
          .json({ msg: `User with id: ${req.params.id} was not found.` });
      }
      return res.status(400).json(err);
    });
};

const addWorkExperience = (req, res) => {
  const data = req.body;
  const newWorkExperience = {};
  for (let field = 0; field < workExperienceInfo.length; field++) {
    newWorkExperience[workExperienceInfo[field]] = data[workExperienceInfo[field]];
  }
  Candidates.findById(new ObjectId(req.params.id))
    .then((candidate) => {
      candidate.workExperience.push(newWorkExperience);
      candidate.save();
      res.status(201).json(newWorkExperience);
    })
    .catch((err, candidate) => {
      if (!candidate) {
        return res
          .status(404)
          .json({ msg: `User with id: ${req.params.id} was not found.` });
      }
      return res.status(400).json(err);
    });
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
    (err, candidateDoc) => {
      if (!candidateDoc) {
        return res.status(404).json({
          msg: `Candidate with id: ${req.params.id} was not found.`,
        });
      }
      if (err) return res.status(400).json(err);
      return res.status(200).json(candidateDoc);
    },
  ).populate("profiles");
};

const updateEducation = (req, res) => {
  const data = req.body;
  const newEducation = {};
  for (let field = 0; field < educationInfo.length; field++) {
    newEducation[educationInfo[field]] = data[educationInfo[field]];
  }
  Candidates.findByIdAndUpdate(
    new ObjectId(req.params.id),
    newEducation,
    { new: true },
    (err, candidateDoc) => {
      if (!candidateDoc) {
        return res.status(404).json({
          msg: `Education with id: ${req.params.educationId} was not found.`,
        });
      }
      if (err) return res.status(400).json(err);
      return res.status(200).json(candidateDoc);
    },
  );
};

const updateWorkExperience = (req, res) => {
  const data = req.body;
  const newWorkExperience = {};
  for (let field = 0; field < workExperienceInfo.length; field++) {
    newWorkExperience[workExperienceInfo[field]] = data[workExperienceInfo[field]];
  }

  return Candidates.findById(new ObjectId(req.params.id))
    .then((candidateDoc) => {
      const candidate = candidateDoc;
      const workExperienceIndex = candidate.workExperience.findIndex(
        (workExperience) => workExperience._id.toString() === req.params.workExperienceId,
      );
      if (workExperienceIndex === -1) {
        return res.status(404).json({
          msg: `Work experience with id: ${req.params.workExperienceId} was not found.`,
        });
      }
      candidate.workExperience[workExperienceIndex] = newWorkExperience;
      candidate.save();
      return res.status(200).json(newWorkExperience);
    })
    .catch((err, candidate) => {
      if (!candidate) {
        return res
          .status(404)
          .json({ msg: `User with id: ${req.params.id} was not found.` });
      }
      return res.status(400).json(err);
    });
};

const remove = (req, res) => {
  Candidates.findByIdAndUpdate(
    new ObjectId(req.params.id),
    { isDeleted: true },
    { new: true },
    (err, deletedCandidate) => {
      if (!deletedCandidate) {
        return res.status(404).json({
          msg: `Candidate with id: ${req.params.educationId} was not found.`,
        });
      }
      if (err) return res.status(400).json(err);
      return res.status(200).json(deletedCandidate);
    },
  ).populate("profiles");
};

const activate = (req, res) => {
  Candidates.findByIdAndUpdate(
    new ObjectId(req.params.id),
    { isDeleted: false },
    { new: true },
    (err, activatedCandidate) => {
      if (!activatedCandidate) {
        return res.status(404).json({
          msg: `Candidate with id: ${req.params.educationId} was not found.`,
        });
      }
      if (err) return res.status(400).json(err);
      return res.status(200).json(activatedCandidate);
    },
  ).populate("profiles");
};

const removeEducation = (req, res) => {
  Candidates.findById(new ObjectId(req.params.id))
    .then((candidate) => {
      const educationIndex = candidate.education.findIndex(
        (education) => education._id.toString() === req.params.educationId,
      );
      if (educationIndex === -1) {
        return res.status(404).json({
          msg: `Education with id: ${req.params.educationId} was not found.`,
        });
      }
      const removedEducation = candidate.education[educationIndex];
      candidate.education.splice(educationIndex, 1);
      candidate.save();
      return res.status(200).json(removedEducation);
    })
    .catch((err, candidate) => {
      if (!candidate) {
        return res
          .status(404)
          .json({ msg: `User with id: ${req.params.id} was not found.` });
      }
      return res.status(400).json(err);
    });
};

const removeWorkExperience = (req, res) => Candidates.findById(new ObjectId(req.params.id))
  .then((candidate) => {
    const workExperienceIndex = candidate.workExperience.findIndex(
      (workExperience) => workExperience._id.toString() === req.params.workExperienceId,
    );
    if (workExperienceIndex === -1) {
      return res.status(404).json({
        msg: `Work experience with id: ${req.params.workExperienceId} was not found.`,
      });
    }
    const removedWorkExperience = candidate.workExperience[workExperienceIndex];
    candidate.workExperience.splice(workExperienceIndex, 1);
    candidate.save();
    return res.status(200).json(removedWorkExperience);
  })
  .catch((err, candidate) => {
    if (!candidate) {
      return res
        .status(404)
        .json({ msg: `User with id: ${req.params.id} was not found.` });
    }
    return res.status(400).json(err);
  });

module.exports = {
  getAll,
  getById,
  getByName,
  create,
  addEducation,
  addWorkExperience,
  update,
  updateEducation,
  updateWorkExperience,
  remove,
  activate,
  removeEducation,
  removeWorkExperience,
  personalInfo,
  educationInfo,
  workExperienceInfo,
  otherInfo,
  allInfo,
};
