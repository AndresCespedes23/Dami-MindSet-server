const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProfilesSchema = new Schema({
  name: {
    type: String,
    maxLength: 50,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    maxLength: 500,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Profiles", ProfilesSchema);
