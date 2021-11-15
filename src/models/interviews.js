const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InterviewsSchema = new Schema({
  idCandidate: {
    type: Schema.Types.ObjectId,
    ref: "Candidates",
    required: true,
  },
  idClient: {
    type: Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  idPosition: {
    type: Schema.Types.ObjectId,
    ref: "Position",
    required: true,
  },
  dateTime: {
    type: Date,
    required: false,
  },
  status: {
    type: String,
    enum: ["IN COURSE", "FINISHED"],
    required: true,
  },
});

module.exports = mongoose.model("Interviews", InterviewsSchema);
