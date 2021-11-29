/* eslint-disable consistent-return */
const Clients = require("../models/clients");
// const Profiles = require("../models/profiles");

const required = (req, res, next) => {
  if (
    !req.body.idClient
    || !req.body.idProfile
    || !req.body.name
    || !req.body.description
    || !req.body.status
    || !req.body.address
    || !req.body.city
    || !req.body.postalCode
  ) {
    return res.status(400).json({ msg: "Some parameters are missing" });
  }
  next();
};

const validate = async (req, res, next) => {
  const { idClient } = req.body;
  // const { idProfile } = req.body;
  const { name } = req.body;
  const { description } = req.body;
  const { status } = req.body;
  const { address } = req.body;
  const { city } = req.body;
  const { postalCode } = req.body;
  if (name) {
    if (name.length > 50) {
      return res
        .status(400)
        .json("Name must have equal or less than 50 characters");
    }
    if (name.search(/[0-9]/) !== -1) { return res.status(400).json("Name must not have numbers"); }
  }
  if (description) {
    if (description.length > 5000) {
      return res
        .status(400)
        .json("Description must have equal or less than 5000 characters");
    }
  }
  if (status !== "DONE" && status !== "PENDING") {
    return res.status(400).json("Status must be DONE or PENDING");
  }
  if (address) {
    if (address.length < 5) { return res.status(400).json("Address must be at least 5 characters"); }
    if (
      address.search(/[a-z]/i) < 0
      || address.search(/[0-9]/) < 0
      || address.indexOf(" ") === -1
    ) {
      return res
        .status(400)
        .json("The Address must have letters, numbers and at least 1 space");
    }
    if (address.length > 50) {
      return res
        .status(400)
        .json("Address must be equal or less than 50 characters");
    }
  }
  if (city) {
    if (city.length < 3) { return res.status(400).json("City must be at least 3 characters"); }
    if (city.length > 50) {
      return res
        .status(400)
        .json("City must be equal or less than 50 characters");
    }
  }
  if (postalCode) {
    if (postalCode.length < 4) { return res.status(400).json("Postal Code must be at least 4 characters"); }
    if (postalCode.length > 8) {
      return res
        .status(400)
        .json("Postal Code must be equal or less than 8 characters");
    }
  }
  /* if (idProfile) {
    const count = await Profiles.count({ _id: { $in: idProfile } });
    if (count !== idProfile.length) {
      return res.status(404).json({ error: "idProfile not found" });
    }
  } */
  if (idClient) {
    return Clients.findById(idClient)
      .then((client) => {
        if (!client) {
          return res
            .status(404)
            .json({ error: `idClient ${idClient} doesn't exist` });
        }
        next();
      })
      .catch((err) => res.status(404).json({ error: err.message }));
  }
  next();
};

module.exports = {
  required,
  validate,
};
