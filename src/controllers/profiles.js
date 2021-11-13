const Profiles = require("../models/profiles");
const ObjectId = require("mongoose").Types.ObjectId;

const getAll = (req, res) => {
  Profiles.find()
    .then((profiles) => {
      return res.status(200).json(profiles);
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

const getById = (req, res) => {
  Profiles.findById({ _id: new ObjectId(req.params.id) })
    .then((profile) => {
      return res.status(200).json(profile);
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

const create = (req, res) => {
  if (!req.body.id || !req.body.name || !req.body.description) {
    return res.status(400).json({ msg: "Some parameters are missing" });
  }
  const newProfile = {
    name: req.body.name,
    description: req.body.description,
  };
  Profiles.create(newProfile);
  return res.status(201).json(newProfile);
};

const update = (req, res) => {
  if (!req.params.id || !req.body.name || !req.body.description) {
    return res.status(400).json({ msg: "Some parameters are missing" });
  }
  const updatedProfile = {
    name: req.body.name,
    description: req.body.description,
  };
  Profiles.findByIdAndUpdate(
    new ObjectId(req.params.id),
    updatedProfile,
    { new: true },
    (err, updatedProfile) => {
      if (!updatedProfile) {
        return res.status(404).json({ msg: `Profile with id: ${req.params.id} was not found.`});
      }
      if (err) return res.status(400).json(err);
      return res.status(200).json(updatedProfile);
    }
  );  
};

// Module Exports
module.exports = {
  getAll,
  getById,
  create,
  update,
};
