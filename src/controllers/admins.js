const Admins = require("../models/admins");

const getAll = (req, res) => {
  Admins.find()
    .then((data) => res.json({ data }))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const getById = (req, res) => {
  const { id } = req.params;
  Admins.findById(id)
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `Administrator not found by ID: ${id}` });
      return res.json({ data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const search = (req, res) => {
  const firstName = req.query.name || null;
  if (!firstName) return res.status(400).json({ msg: "Missing query param: name" });
  return Admins.find({ firstName })
    .then((data) => {
      if (data.length === 0) return res.status(404).json({ msg: `Administrator not found by name: ${firstName}` });
      return res.json({ data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const update = (req, res) => {
  const { id } = req.params;
  Admins.findByIdAndUpdate(id, req.body, { new: true })
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `Administrator not found by ID: ${id}` });
      return res.json({ msg: "Administrator updated", data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

module.exports = {
  getAll,
  getById,
  search,
  update,
};
