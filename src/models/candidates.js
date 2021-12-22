const mongoose = require("mongoose");

const { Schema } = mongoose;

const EducationSchema = new Schema({
  level: {
    type: String,
    enum: ["primary", "secondary", "tertiary", "university"],
    required: false,
  },
  institution: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
  startDate: {
    type: Date,
    required: false,
  },
  finishDate: {
    type: Date,
    required: false,
  },
  inProgress: {
    type: Boolean,
    required: false,
  },
});

const WorkExperienceSchema = new Schema({
  company: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: false,
  },
  startDate: {
    type: Date,
    required: false,
  },
  finishDate: {
    type: Date,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  accomplishments: {
    type: String,
    required: false,
  },
});

const CoursesSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  organization: {
    type: String,
    required: false,
  },
  duration: {
    type: Number,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
});

const CandidatesSchema = new Schema({
  // Personal Information
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  repeatPassword: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: false,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ["ACTIVE", "INACTIVE", "PENDING INTERVIEW", "DISABLED"],
    required: false,
    default: "PENDING INTERVIEW",
  },
  timeRange: {
    type: [String],
    required: false,
  },
  profiles: {
    type: [Schema.Types.ObjectId],
    ref: "Profiles",
    required: false,
  },
  // Education
  education: {
    type: [EducationSchema],
    required: false,
  },
  // Work Experience
  workExperience: {
    type: [WorkExperienceSchema],
    required: false,
  },
  // Work Experience
  courses: {
    type: [CoursesSchema],
    required: false,
  },
  // Other Information
  description: {
    type: String,
    required: false,
  },
  dni: {
    type: Number,
    required: false,
  },
  nationality: {
    type: String,
    required: false,
  },
  maritalStatus: {
    type: String,
    enum: ["single", "married", "divorced", "widowed"],
    required: false,
  },
  driversLicense: {
    type: Boolean,
    required: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Candidates", CandidatesSchema);
