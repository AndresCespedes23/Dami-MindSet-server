const Positions = require("../models/positions");

const getAll = (req, res) => {
  Positions.find({ isDeleted: false })
    .populate("idClient", "name")
    .populate("idProfile", "name description")
    .then((data) => res.json({ data }))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const getById = (req, res) => {
  const { id } = req.params;
  Positions.findOne({ $and: [{ _id: id }, { isDeleted: false }] })
    .populate("idClient", "name")
    .populate("idProfile", "name description")
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `Position not found by ID: ${id}` });
      return res.json({ data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const create = (req, res) => {
  const newPosition = {
    idClient: req.body.idClient,
    idProfile: req.body.idProfile,
    /* const idProfileArray = [];
    req.body.idProfile.forEach((id) => {
      idProfileArray.push(new ObjectId(id));
    }); */
    name: req.body.name,
    description: req.body.description,
    status: req.body.status,
    address: req.body.address,
    city: req.body.city,
    postalCode: req.body.postalCode,
  };
  Positions.create(newPosition)
    .then((data) => res.json({ msg: "Position added", data }))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const update = (req, res) => {
  const { id } = req.params;
  const updatedPosition = {
    idClient: req.body.idClient,
    idProfile: req.body.idProfile,
    name: req.body.name,
    description: req.body.description,
    status: req.body.status,
    address: req.body.address,
    city: req.body.city,
    postalCode: req.body.postalCode,
  };
  Positions.findByIdAndUpdate(id, updatedPosition, { new: true })
    .populate("idClient", "name")
    .populate("idProfile", "name description")
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `Position not found by ID: ${id}` });
      return res.json({ msg: "Position updated", data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const remove = (req, res) => {
  const { id } = req.params;
  Positions.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
    .populate("idClient", "name")
    .populate("idProfile", "name description")
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `Position not found by ID: ${id}` });
      return res.json({ msg: "Position deleted", data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const activate = (req, res) => {
  const { id } = req.params;
  Positions.findByIdAndUpdate(id, { isDeleted: false }, { new: true })
    .populate("idClient", "name")
    .populate("idProfile", "name description")
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `Position not found by ID: ${id}` });
      return res.json({ msg: "Position activated", data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  activate,
};
