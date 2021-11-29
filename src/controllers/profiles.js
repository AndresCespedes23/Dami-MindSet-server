const { ObjectId } = require("mongoose").Types;
const Profiles = require("../models/profiles");

const getAll = (req, res) => {
  Profiles.find({ isDeleted: false })
    .then((profiles) => res.status(200).json(profiles))
    .catch((err) => res.status(400).json(err));
};

const getById = (req, res) => {
  Profiles.findById({ _id: new ObjectId(req.params.id) })
    .then((profile) => res.status(200).json(profile))
    .catch((err) => res.status(400).json(err));
};

const create = (req, res) => {
  const newProfile = {
    name: req.body.name,
    description: req.body.description,
  };
  Profiles.create(newProfile)
    .then((profileDoc) => res.status(201).json(profileDoc))
    .catch((err) => res.status(400).json(err));
};

const update = (req, res) => {
  const updatedProfile = {
    name: req.body.name,
    description: req.body.description,
  };
  return Profiles.findByIdAndUpdate(
    req.params.id,
    updatedProfile,
    { new: true },
    (err, profileDoc) => {
      if (!profileDoc) {
        return res
          .status(404)
          .json({ msg: `Profile with id: ${req.params.id} was not found.` });
      }
      if (err) return res.status(400).json(err);
      return res.status(200).json(profileDoc);
    },
  );
};

const remove = (req, res) => {
  Profiles.findByIdAndUpdate(
    new ObjectId(req.params.id),
    { isDeleted: true },
    { new: true },
    (err, deletedProfile) => {
      if (err) return res.status(400).json(err);
      return res.status(200).json(deletedProfile);
    },
  );
};

const activate = (req, res) => {
  Profiles.findByIdAndUpdate(
    new ObjectId(req.params.id),
    { isDeleted: false },
    { new: true },
    (err, activatedProfile) => {
      if (err) return res.status(400).json(err);
      return res.status(200).json(activatedProfile);
    },
  );
};

// Module Exports
module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  activate,
};
