const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClientsSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 50,
  },
  email: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 50,
  },
  phoneNumber: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 15,
  },
  cuit: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 11,
  },
  address: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 50,
  },
  activity: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 20,
  },
});

module.exports = mongoose.model("Clients", ClientsSchema);
