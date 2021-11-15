/* eslint-disable no-useless-escape */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClientsSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 50,
    match: /^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/,
  },
  email: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 50,
    match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  phoneNumber: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 15,
    match: /^\d+$/,
  },
  cuit: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 11,
    match: /^\d+$/,
  },
  address: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 50,
    match: /^[a-zA-Z0-9\s,'-]*$/,
  },
  activity: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 20,
    match: /^([^0-9]*)$/,
  },
});

module.exports = mongoose.model("Clients", ClientsSchema);
