const Applications = require("../models/applications");
const ObjectId = require("mongoose").Types.ObjectId;

const getAll = (req, res) => {
  Applications.find()
    .then((applications) => {
      return res.status(200).json(applications);
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

const getById = (req, res) => {
  Applications.findById({ _id: new ObjectId(req.params.id) })
    .then((application) => {
      return res.status(200).json(application);
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

// const create = (req, res) => {
//   if (
//     !req.query.idPosition ||
//     !req.query.idCandidate ||
//     !req.query.idInterview ||
//     !req.query.result ||
//     !req.query.dateTime ||
//     !req.query.status
//   ) {
//     return res.status(400).json({ Msg: "Some parameters are missing" });
//   }
//   let index = parseInt(applications[applications.length - 1].id) + 1;
//   index = index.toString();
//   const newApplication = {
//     id: index,
//     idPosition: req.query.idPosition,
//     idCandidate: req.query.idCandidate,
//     idInterview: req.query.idInterview,
//     result: req.query.result,
//     dateTime: req.query.dateTime,
//     status: req.query.status,
//   };
//   applications.push(newApplication);
//   res.status(201).json(newApplication);
// };

// const update = (req, res) => {
//   const index = applications.findIndex(
//     (element) => req.params.id === element.id
//   );
//   if (index === -1) {
//     return res
//       .status(404)
//       .json({ Msg: "Application with that ID does not exist" });
//   }
//   for (let property in req.query) {
//     applications[index][property] = req.query[property];
//   }
//   res.status(201).json(applications[index]);
// };

// const remove = (req, res) => {
//   const indexApplication = applications.findIndex(
//     (element) => element.id === req.params.id
//   );
//   if (indexApplication === -1) {
//     return res
//       .status(404)
//       .json({ Msg: "Application with that ID does not exist" });
//   }
//   const removedApplication = applications.splice(indexApplication, 1);
//   res.status(201).json(removedApplication);
// };

module.exports = {
  getAll,
  getById,
  // create,
  // update,
  // remove,
};
