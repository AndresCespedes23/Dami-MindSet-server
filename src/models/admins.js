const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AdminsSchema = new Schema({
  name: {
    type: String,
    maxlength: 50,
    required: true,
  },
  email: {
    type: String,
    maxlength: 20,
    required: true,
  },
  username: {
    type: String,
    maxlength: 50,
    required: true,
  },
  password: {
    type: String,
    maxlength: 20,
    required: true,
  },
  isSuperAdmin: {
    type: Boolean,
    required: true,
  },
});
module.exports = mongoose.model("Admins", AdminsSchema);
