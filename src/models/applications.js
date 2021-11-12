const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ApplicationsSchema = new Schema({
  id: Schema.Types.ObjectId,
  idPosition: {
    type: Schema.Types.ObjectId,
    ref: "Positions",
    required: true,
  },
  idCandidate: {
    type: Schema.Types.ObjectId,
    ref: "Candidates",
    required: true,
  },
  idInterview: {
    type: Schema.Types.ObjectId,
    ref: "Interviews",
    required: true,
  },
  dateTime: {
    type: Date,
    required: false,
  },
  status: {
    enum: ["PENDING", "SCHEDULED", "HIRED", "REJECTED"],
  },
  result: {
    type: String,
    max: 500,
    required: true,
  },
});

module.exports = mongoose.model("Applications", ApplicationsSchema);
