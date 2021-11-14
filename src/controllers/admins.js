const Admins = require("../models/admins");


const getAll = (req, res) => {
  Admins.find()
    .then((admins) => {
      return res.status(200).json(admins);
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

const getById = (req, res) => {
  Admins.findById(req.params.id)
    .then((admin) => {
      return res.status(200).json(admin);
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};
const getByName = (req, res) => {
  Admins.find({ name: req.params.name })
    .then((admin) => {
      return res.status(200).json(admin);
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

const update = (req, res) => {
  const updatedAdmin = {
    name: req.body.name,
  };
  Admins.findByIdAndUpdate(
    req.params.id,
    updatedAdmin,
    { new: true },
    (err, updatedAdmin) => {
      if (!updatedAdmin) {
        return res
          .status(404)
          .json({ msg: `Admin with id: ${req.params.id} was not found.` });
      }
      if (err) return res.status(400).json(err);
      return res.status(200).json(updatedAdmin);
    }
  );
};

module.exports = {
  getAll,
  getById,
  getByName,
  update
};
