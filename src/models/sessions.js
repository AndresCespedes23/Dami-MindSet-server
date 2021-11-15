const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
  dateTime: {
    type: Date,
    required: false,
  },
  status: {
    type: String,
    enum: ["PENDING", "DONE"],
  },
  result: {
    type: String,
    maxLength: 500,
  },
});

module.exports = mongoose.model("Sessions", SessionsSchema);
