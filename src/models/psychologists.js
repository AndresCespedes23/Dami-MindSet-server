const mongoose = require("mongoose");

const { Schema } = mongoose;

const PsychologistsSchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    maxLength: 30,
    required: true,
  },
  email: {
    type: String,
    maxLength: 30,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    maxLength: 30,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    maxLength: 30,
    required: true,
  },
  phoneNumber: {
    type: String,
    maxLength: 15,
    required: true,
    unique: true,
  },
  enrollmentNumber: {
    type: String,
    maxLength: 4,
    required: true,
    unique: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  timeRange: {
    type: [String],
  },
  dayRange: {
    type: [String],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Psychologists", PsychologistsSchema);
