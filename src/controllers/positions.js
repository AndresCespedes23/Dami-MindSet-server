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
  if (
    !req.body.idClient ||
    !req.body.idProfiles ||
    !req.body.name ||
    !req.body.description ||
    !req.body.status ||
    !req.body.address ||
    !req.body.city ||
    !req.body.postalCode
  ) {
    return res.status(400).json({ Msg: "Some parameters are missing" });
  }
  const newPosition = new Positions({
    idClient: new ObjectId(req.body.idClient),
    idProfiles: new ObjectId(req.body.idProfiles),
    name: req.body.name,
    description: req.body.description,
    status: req.body.status,
    address: req.body.address,
    city: req.body.city,
    postalCode: req.body.postalCode,
  });
  newPosition.save((error) => {
    if (error) {
      return res.status(400).json(error);
    }
    return res.status(201).json(newPosition);
  });
};

// const update = (req, res) => {
//   const filteredPosition = positions.find(
//     (element) => element.id === req.params.id
//   );
//   const indexPosition = positions.findIndex(
//     (element) => element.id === req.params.id
//   );
//   if (!filteredPosition) {
//     return res
//       .status(404)
//       .json({ Msg: "Position with that ID does not exist" });
//   }
//   const updatedPosition = req.query;
//   filteredPosition.idClient =
//     updatedPosition.idClient || filteredPosition.idClient;
//   filteredPosition.idProfiles =
//     updatedPosition.idProfiles.split(",") || filteredPosition.idProfiles;
//   filteredPosition.name = updatedPosition.name || filteredPosition.name;
//   filteredPosition.description =
//     updatedPosition.description || filteredPosition.description;
//   filteredPosition.status = updatedPosition.status
//     ? updatedPosition.status === "true"
//     : filteredPosition.status;
//   filteredPosition.address =
//     updatedPosition.address || filteredPosition.address;
//   filteredPosition.city = updatedPosition.city || filteredPosition.city;
//   filteredPosition.postalCode =
//     updatedPosition.postalCode || filteredPosition.postalCode;
//   // update changes in position
//   positions[indexPosition] = filteredPosition;
//   res.status(200).json(filteredPosition);
// };

// const remove = (req, res) => {
//   const indexPosition = positions.findIndex(
//     (element) => element.id === req.params.id
//   );
//   if (indexPosition === -1) {
//     return res
//       .status(404)
//       .json({ Msg: "Position with that ID does not exist" });
//   }
//   const removedPosition = positions.splice(indexPosition, 1);
//   res.status(200).json(removedPosition);
// };

module.exports = {
  getAll: getAll,
  getById: getById,
  create: create,
  // update: update,
  // remove: remove,
};
