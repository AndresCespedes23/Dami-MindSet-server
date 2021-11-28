const mongoose = require("mongoose");

const { Schema } = mongoose;

const InterviewsSchema = new Schema({
  idCandidate: {
    type: Schema.Types.ObjectId,
    ref: "Candidates",
    required: true,
  },
  idClient: {
    type: Schema.Types.ObjectId,
    ref: "Clients",
    required: true,
  },
  idPosition: {
    type: Schema.Types.ObjectId,
    ref: "Positions",
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["DONE", "PENDING"],
    required: true,
  },
});

module.exports = mongoose.model("Interviews", InterviewsSchema);
