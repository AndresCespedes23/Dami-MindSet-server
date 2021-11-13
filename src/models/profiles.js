const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfilesSchema = new Schema({});

module.exports = mongoose.model("Profiles", ProfilesSchema);