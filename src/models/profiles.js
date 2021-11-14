const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
});

module.exports = mongoose.model("Profiles", ProfilesSchema);
