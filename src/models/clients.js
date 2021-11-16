/* eslint-disable no-useless-escape */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClientsSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: [2, "Min Length is 2"],
    maxLength: [50, "Max lenght is 50"],
  },
  email: {
    type: String,
    required: true,
    minLength: [6, "Min Length is 6"],
    maxLength: [50, "Max lenght is 50"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Must be a valid email format",
    ],
  },
  phoneNumber: {
    type: String,
    required: true,
    minLength: [6, "Min Length is 6"],
    maxLength: [15, "Max lenght is 15"],
    match: [/^\d+$/, "Can only contain numbers"],
  },
  cuit: {
    type: String,
    required: true,
    minLength: [6, "Min Length is 6"],
    maxLength: [15, "Max lenght is 15"],
    match: [/^\d+$/, "Can only contain numbers"],
  },
  address: {
    type: String,
    required: true,
    minLength: [6, "Min Length is 6"],
    maxLength: [100, "Max lenght is 100"],
    match: [/^[a-zA-Z0-9\s,.'-]{3,}$/, "Can't contain special characters"],
  },
  activity: {
    type: String,
    required: true,
    minLength: [3, "Min Length is 3"],
    maxLength: [20, "Max lenght is 20"],
    match: [/^([^0-9]*)$/, "Can't contain numbers"],
  },
});

module.exports = mongoose.model("Clients", ClientsSchema);
