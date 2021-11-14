const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EducationSchema = new Schema({
  level: {
    type: String,
    enum: ["Primary", "Secondary", "Tertiary", "University", "Course"],
    required: true,
  },
  institution: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  finishDate: {
    type: Date,
    required: false,
  },
  inProgress: {
    type: Boolean,
    required: true,
  },
});

const WorkExperienceSchema = new Schema({
  company: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  finishDate: {
    type: Date,
    required: false,
  },
  currently: {
    type: Boolean,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  accomplishments: {
    type: String,
    required: false,
  },
});

const CandidatesSchema = new Schema({
  //Personal Information
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
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
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
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["ACTIVE", "INACTIVE", "PENDING INTERVIEW", "DISABLED"],
    required: true,
  },
  timeRange: {
    type: String, //Ver type
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
  //Other Information
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
    enum: ["Single", "Married", "Divorced", "Widowed"],
    required: false,
  },
  driversLicense: {
    type: Boolean,
    required: false,
  },
});

module.exports = mongoose.model("Candidates", CandidatesSchema);
