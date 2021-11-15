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
  const newProfile = {
    name: req.body.name,
    description: req.body.description,
  };
  Profiles.create(newProfile)
    .then((newProfile) => {
      return res.status(200).json(newProfile);
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

const update = (req, res) => {
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
        return res
          .status(404)
          .json({ msg: `Profile with id: ${req.params.id} was not found.` });
      }
      if (err) return res.status(400).json(err);
      return res.status(200).json(updatedProfile);
    }
  );
};

const remove = (req, res) => {
  Profiles.findByIdAndRemove(
    new ObjectId(req.params.id),
    (err, removedProfile) => {
      if (err) return res.status(400).json(err);
      return res.status(200).json(removedProfile._id);
    }
  );
};

// Module Exports
module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
