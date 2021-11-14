const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PsychologistsSchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    maxLength:30,
    required: true,
  },
  email: {
    type: String,
    maxLength:30,
    required: true,
  },
  username: {
    type: String,
    maxLength:30,
    required: true,
  },
  password: {
    type: String,
    maxLength:30,
    required: true,
  },
  phoneNumber: {
    type: String,
    maxLength:15,
    required: true,
  },
  enrollmentNumber: {
    type: String,
    maxLength:4,
    required: true,
  },
  status: {
    type: Boolean,
    required:true,
  },
  timeRange: {
    type: [Number],
  },
  dayRange: {
    type: [Number],
  },
});

module.exports = mongoose.model("Psychologists", PsychologistsSchema);
