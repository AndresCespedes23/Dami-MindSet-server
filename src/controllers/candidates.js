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

const educationInfo = ["institution", "startDate", "finishDate", "level", "inProgress", "title"];

const workExperienceInfo = ["company", "role", "startDate", "finishDate", "description", "accomplishments"];

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
  Candidates.find({ isDeleted: false })
    .populate("profiles")
    .then((data) => res.json({ data }))
    .catch((error) => res.status(500).json({ msg: `Error: ${error}` }));
};

const getById = (req, res) => {
  const { id } = req.params;
  Candidates.findOne({ $and: [{ _id: id }, { isDeleted: false }] })
    .populate("profiles")
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `Candidate not found by ID: ${id}` });
      return res.json({ data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const search = (req, res) => {
  const firstName = req.query.name;
  if (!firstName) return res.status(400).json({ msg: "Missing query param: name" });
  return Candidates.find({ $and: [{ name: firstName }, { isDeleted: false }] })
    .populate("profiles")
    .then((data) => res.json({ data }))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const create = (req, res) => {
  const newCandidate = new Candidates(req.body);
  newCandidate
    .save()
    .then((data) => res.status(201).json({ msg: "Candidate created", data }))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

const addEducation = (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const newEducation = {};
  for (let field = 0; field < educationInfo.length; field++) {
    newEducation[educationInfo[field]] = data[educationInfo[field]];
  }
  Candidates.findById(id)
    .then((candidate) => {
      if (!candidate) return res.status(404).json({ msg: `Candidate not found by ID: ${id}` });
      candidate.education.push(newEducation);
      return candidate
        .save()
        .then((education) => res.json({ msg: "Education created", data: education }))
        .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const addWorkExperience = (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const newWorkExperience = {};
  for (let field = 0; field < workExperienceInfo.length; field++) {
    newWorkExperience[workExperienceInfo[field]] = data[workExperienceInfo[field]];
  }
  Candidates.findById(id)
    .then((candidate) => {
      if (!candidate) return res.status(404).json({ msg: `Candidate not found by ID: ${id}` });
      candidate.workExperience.push(newWorkExperience);
      return candidate
        .save()
        .then((workExperience) => res.json({ msg: "Work Experience created", data: workExperience }))
        .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const update = (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const updatedCandidate = {};
  for (let field = 0; field < allInfo.length; field++) {
    updatedCandidate[allInfo[field]] = data[allInfo[field]];
  }
  updatedCandidate.workExperience = data.workExperience;
  updatedCandidate.education = data.education;
  Candidates.findByIdAndUpdate(id, updatedCandidate, { new: true })
    .populate("profiles")
    .then((newCandidate) => {
      if (!newCandidate) return res.status(404).json({ msg: `Candidate not found by ID: ${id}` });
      return res.json({ msg: "Candidate updated", data: newCandidate });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const updateEducation = (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const newEducation = {};
  for (let field = 0; field < educationInfo.length; field++) {
    newEducation[educationInfo[field]] = data[educationInfo[field]];
  }
  Candidates.findByIdAndUpdate(id, newEducation, { new: true })
    .then((newCandidate) => {
      if (!newCandidate) return res.status(404).json({ msg: `Candidate not found by ID: ${id}` });
      return res.json({ msg: "Candidate updated", data: newCandidate });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const updateWorkExperience = (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const newWorkExperience = {};
  for (let field = 0; field < workExperienceInfo.length; field++) {
    newWorkExperience[workExperienceInfo[field]] = data[workExperienceInfo[field]];
  }

  return Candidates.findById(id)
    .then((candidateDoc) => {
      if (!candidateDoc) return res.status(404).json({ msg: `Candidate not found by ID: ${id}` });
      const candidate = candidateDoc;
      const workExperienceIndex = candidate.workExperience.findIndex(
        (workExperience) => workExperience._id.toString() === req.params.workExperienceId,
      );
      if (workExperienceIndex === -1) {
        return res
          .status(404)
          .json({ msg: `Work experience with id: ${req.params.workExperienceId} was not found.` });
      }
      candidate.workExperience[workExperienceIndex] = newWorkExperience;
      candidate.save();
      return res.json({ msg: "Candidate updated", data: newWorkExperience });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const remove = (req, res) => {
  const { id } = req.params;
  Candidates.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
    .populate("profiles")
    .then((removedCandidate) => {
      if (!removedCandidate) return res.status(404).json({ msg: `Candidate not found by ID: ${id}` });
      return res.json({ msg: "Candidate removed", data: removedCandidate });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const activate = (req, res) => {
  const { id } = req.params;
  Candidates.findByIdAndUpdate(id, { isDeleted: false }, { new: true })
    .populate("profiles")
    .then((removedCandidate) => {
      if (!removedCandidate) return res.status(404).json({ msg: `Candidate not found by ID: ${id}` });
      return res.json({ msg: "Candidate activated", data: removedCandidate });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const removeEducation = (req, res) => {
  const { id } = req.params;
  Candidates.findById(id)
    .then((candidate) => {
      if (!candidate) return res.status(404).json({ msg: `Candidate not found by ID: ${id}` });
      const educationIndex = candidate.education.findIndex(
        (education) => education._id.toString() === req.params.educationId,
      );
      if (educationIndex === -1) { return res.status(404).json({ msg: `Education with id: ${req.params.educationId} was not found.` }); }
      const removedEducation = candidate.education[educationIndex];
      candidate.education.splice(educationIndex, 1);
      candidate.save();
      return res.json({ msg: "Education removed", data: removedEducation });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const removeWorkExperience = (req, res) => {
  const { id } = req.params;
  Candidates.findById(id)
    .then((candidate) => {
      if (!candidate) return res.status(404).json({ msg: `Candidate not found by ID: ${id}` });
      const workExperienceIndex = candidate.workExperience.findIndex(
        (workExperience) => workExperience._id.toString() === req.params.workExperienceId,
      );
      if (workExperienceIndex === -1) {
        return res
          .status(404)
          .json({ msg: `Work experience with id: ${req.params.workExperienceId} was not found.` });
      }
      const removedWorkExperience = candidate.workExperience[workExperienceIndex];
      candidate.workExperience.splice(workExperienceIndex, 1);
      candidate.save();
      return res.json({ msg: "Education removed", data: removedWorkExperience });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

module.exports = {
  getAll,
  getById,
  search,
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
