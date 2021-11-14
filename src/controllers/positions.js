const Positions = require("../models/positions");
const ObjectId = require("mongoose").Types.ObjectId;

const getAll = (req, res) => {
  Positions.find()
    .then((positions) => {
      return res.status(200).json(positions);
    })
    .catch((err) => {
      return res.status(404).json(err);
    });
};

const getById = (req, res) => {
  Positions.findById({ _id: new ObjectId(req.params.id) })
    .then((positions) => {
      return res.status(200).json(positions);
    })
    .catch((err) => {
      return res.status(404).json(err);
    });
};

const create = (req, res) => {
  const newPosition = {
    idClient: new ObjectId(req.body.idClient),
    idProfile: new ObjectId(req.body.idProfile),
    name: req.body.name,
    description: req.body.description,
    status: req.body.status,
    address: req.body.address,
    city: req.body.city,
    postalCode: req.body.postalCode,
  };
  Positions.create(newPosition);
  res.status(201).json(newPosition);
};

const update = (req, res) => {
  const updatedPosition = {
    idClient: new ObjectId(req.body.idClient),
    idProfile: new ObjectId(req.body.idProfile),
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
    (err, updatedPosition) => {
      if (!updatedPosition) {
        return res
          .status(404)
          .json({ msg: `Position with id: ${req.params.id} was not found.` });
      }
      if (err) return res.status(400).json(err);
      return res.status(200).json(updatedPosition);
    }
  );
};

const remove = (req, res) => {
  Positions.findByIdAndRemove(
    new ObjectId(req.params.id),
    (err, removedPosition) => {
      if (err) return res.status(400).json(err);
      return res.status(200).json(removedPosition._id);
    }
  );
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
