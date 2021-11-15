const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AdminsSchema = new Schema({
  name: {
    type: String,
    maxLength: 50,
    required: true,

  },
  email: {
    type: String,
    maxLength: 20,
    required: true,
    unique: true

  },
  username: {
    type: String,
    maxLength: 50,
    required: true,
    unique: true
  },
  password: {
    type: String,
    maxLength: 20,
    required: true,

  },
  isSuperAdmin: {
    type: Boolean,
    required: true,
  },
});
module.exports = mongoose.model("Admins", AdminsSchema);
