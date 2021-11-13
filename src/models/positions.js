const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PositionsSchema = new Schema({
  idClient: {
    type: Schema.Types.ObjectId,
    ref: "Clients",
    required: true,
  },
  idProfile: {
    type: Schema.Types.ObjectId,
    ref: "Profiles",
    required: true,
  },
  name: {
    type: String,
    maxlength: 50,
    required: true,
  },
  description: {
    type: String,
    maxlength: 5000,
    required: true,
  },
  status: {
    type: String,
    enum: ["DONE", "PENDING"],
    required: true,
  },
  address: {
    type: String,
    maxlength: 50,
    required: true,
  },
  city: {
    type: String,
    maxlength: 50,
    required: true,
  },
  postalCode: {
    type: String,
    minlength: 4,
    maxlength: 8,
    required: true,
  },
});

module.exports = mongoose.model("Positions", PositionsSchema);
