const mongoose = require("mongoose");

const { Schema } = mongoose;
const AdminsSchema = new Schema({
  name: {
    type: String,
    maxLength: 50,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    maxLength: 50,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    maxLength: 20,
    required: true,
  },
  isSuperAdmin: {
    type: Boolean,
  },
});
module.exports = mongoose.model("Admins", AdminsSchema);
