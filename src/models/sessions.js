const mongoose = require("mongoose");

const { Schema } = mongoose;

const SessionsSchema = new Schema({
  idPsychologist: {
    type: Schema.Types.ObjectId,
    ref: "Psychologists",
    required: true,
  },
  idCandidate: {
    type: Schema.Types.ObjectId,
    ref: "Candidates",
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["PENDING", "DONE"],
    required: true,
  },
  result: {
    type: String,
    maxLength: 500,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Sessions", SessionsSchema);
