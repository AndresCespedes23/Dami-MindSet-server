const mongoose = require("mongoose");

const { Schema } = mongoose;

const AdminsSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
  },
  name: {
    type: String,
    maxLength: 50,
    required: true,
  },
  email: {
    type: String,
    maxLength: 30,
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
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  firebaseUid: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Admins", AdminsSchema);
