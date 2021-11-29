const { ObjectId } = require("mongoose").Types;
const Positions = require("../models/positions");

const getAll = (req, res) => {
  Positions.find({ isDeleted: false }).populate("idClient", "name").populate("idProfile", "name description")
    .then((positions) => res.status(200).json(positions))
    .catch((err) => res.status(404).json(err));
};

const getById = (req, res) => {
  Positions.findOne({ $and: [{ _id: new ObjectId(req.params.id) }, { isDeleted: false }] }).populate("idClient", "name").populate("idProfile", "name description")
    .then((positions) => res.status(200).json(positions))
    .catch((err) => res.status(404).json(err));
};

const create = (req, res) => {
  const idProfileArray = [];
  req.body.idProfile.forEach((id) => {
    idProfileArray.push(new ObjectId(id));
  });
  const newPosition = {
    idClient: new ObjectId(req.body.idClient),
    idProfile: idProfileArray,
    name: req.body.name,
    description: req.body.description,
    status: req.body.status,
    address: req.body.address,
    city: req.body.city,
    postalCode: req.body.postalCode,
  };
  Positions.create(newPosition)
    .then((positionDoc) => res.status(201).json(positionDoc))
    .catch((err) => res.status(400).json(err));
};

const update = (req, res) => {
  const updatedPosition = {
    idClient: new ObjectId(req.body.idClient),
    idProfile: req.body.idProfile,
    name: req.body.name,
    description: req.body.description,
    status: req.body.status,
    address: req.body.address,
    city: req.body.city,
    postalCode: req.body.postalCode,
  };
  Positions.findByIdAndUpdate(
    new ObjectId(req.params.id),
    updatedPosition,
    { new: true },
    (err, positionDoc) => {
      if (!positionDoc) {
        return res
          .status(404)
          .json({ msg: `Position with id: ${req.params.id} was not found.` });
      }
      if (err) return res.status(400).json(err);
      return res.status(200).json(positionDoc);
    },
  ).populate("idClient", "name").populate("idProfile", "name description");
};

const remove = (req, res) => {
  Positions.findByIdAndUpdate(
    new ObjectId(req.params.id),
    { isDeleted: true },
    { new: true },
    (err, deletedPosition) => {
      if (!deletedPosition) {
        return res
          .status(404)
          .json({ msg: `Position with id: ${req.params.id} was not found.` });
      }
      if (err) return res.status(400).json(err);
      return res.status(200).json(deletedPosition);
    },
  ).populate("idClient", "name").populate("idProfile", "name description");
};

const activate = (req, res) => {
  Positions.findByIdAndUpdate(
    new ObjectId(req.params.id),
    { isDeleted: false },
    { new: true },
    (err, activatedPosition) => {
      if (!activatedPosition) {
        return res
          .status(404)
          .json({ msg: `Position with id: ${req.params.id} was not found.` });
      }
      if (err) return res.status(400).json(err);
      return res.status(200).json(activatedPosition);
    },
  ).populate("idClient", "name").populate("idProfile", "name description");
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  activate,
};
