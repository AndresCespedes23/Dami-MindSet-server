const mongoose = require("mongoose");

const { Schema } = mongoose;

const UsersSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firebaseUid: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ["ADMIN", "CANDIDATE", "PSYCHOLOGIST"],
    required: true,
  },
});

module.exports = mongoose.model("Users", UsersSchema);
