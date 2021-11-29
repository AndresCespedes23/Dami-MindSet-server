const mongoose = require("mongoose");

const { Schema } = mongoose;

const ApplicationsSchema = new Schema({
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
    type: String,
    enum: ["PENDING", "SCHEDULED", "HIRED", "REJECTED"],
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

module.exports = mongoose.model("Applications", ApplicationsSchema);
