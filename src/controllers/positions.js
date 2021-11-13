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

// const create = (req, res) => {
//   //check if all the parameters were sent
//   if (
//     !req.query.id ||
//     !req.query.idClient ||
//     !req.query.idProfiles ||
//     !req.query.name ||
//     !req.query.description ||
//     !req.query.status === true ||
//     !req.query.address ||
//     !req.query.city ||
//     !req.query.postalCode
//   ) {
//     return res.status(400).json({ Msg: "Some parameters are missing" });
//   }
//   // change the type of idProfiles from string to array of strings
//   const idProfilesArray = req.query.idProfiles.split(",");
//   const newPosition = {
//     id: req.query.id,
//     idClient: req.query.idClient,
//     idProfiles: idProfilesArray,
//     name: req.query.name,
//     description: req.query.description,
//     status: req.query.status === "true",
//     address: req.query.address,
//     city: req.query.city,
//     postalCode: req.query.postalCode,
//   };
//   positions.push(newPosition);
//   res.status(201).json(newPosition);
// };

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
  // getByName: getByName,
  // create: create,
  // update: update,
  // remove: remove,
};
