const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AdminsSchema = new Schema({
  name: {
    type: String,
    ref: "Name",
    required: true,
  },
  email: {
    type: String,
    ref: "Email",
    required: true,
  },
  username: {
    type: String,
    ref: "User",
    required: true,
  },
  password: {
    type: String,
    ref: "Pass",
    required: true,
  },
});
module.exports = mongoose.model("Admins", AdminsSchema);