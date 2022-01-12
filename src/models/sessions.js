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
  },
  time: {
    type: String,
  },
  status: {
    type: String,
    enum: ["PENDING", "DONE"],
    required: true,
  },
  result: {
    type: [Schema.Types.ObjectId],
    ref: "Profiles",
    required: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Sessions", SessionsSchema);
