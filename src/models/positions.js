const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PositionsSchema = new Schema({
  idClient: {
    type: Schema.Types.ObjectId,
    ref: "Clients",
    required: true,
  },
  idProfile: [
    {
      type: Schema.Types.ObjectId,
      ref: "Profiles",
      required: true,
    },
  ],
  name: {
    type: String,
    maxLength: 50,
    required: true,
  },
  description: {
    type: String,
    maxLength: 5000,
    required: true,
  },
  status: {
    type: String,
    enum: ["DONE", "PENDING"],
    required: true,
  },
  address: {
    type: String,
    minLength: 5,
    maxLength: 50,
    required: true,
  },
  city: {
    type: String,
    minLenght: 3,
    maxLength: 50,
    required: true,
  },
  postalCode: {
    type: String,
    minLength: 4,
    maxLength: 8,
    required: true,
  },
});

module.exports = mongoose.model("Positions", PositionsSchema);
