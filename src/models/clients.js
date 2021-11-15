const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    maxlength: 50,
  },
  phoneNumber: {
    type: String,
    required: true,
    maxlength: 15,
  },
  cuit: {
    type: String,
    required: true,
    maxlength: 11,
  },
  address: {
    type: String,
    required: true,
    maxlength: 50,
  },
  activity: {
    type: String,
    required: true,
    maxlength: 20,
  },
});

module.exports = mongoose.model("Client", ClientSchema);
