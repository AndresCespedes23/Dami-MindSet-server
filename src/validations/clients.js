/* eslint-disable consistent-return */
const Clients = require("../models/clients");

const dataBodyRequired = (req, res, next) => {
  if (!req.body.name) return res.status(400).json({ msg: "Name is missing" });
  if (!req.body.email) return res.status(400).json({ msg: "Email is missing" });
  if (!req.body.phoneNumber) return res.status(400).json({ msg: "PhoneNumber is missing" });
  if (!req.body.cuit) return res.status(400).json({ msg: "Cuit is missing" });
  if (!req.body.address) return res.status(400).json({ msg: "Address is missing" });
  if (!req.body.activity) return res.status(400).json({ msg: "Activity is missing" });
  next();
};

const formatBodyRequired = (req, res, next) => {
  if (req.body.name) {
    if (typeof req.body.name !== "string") return res.status(400).json({ msg: "Name must be string" });
    if (req.body.name.length > 50 || req.body.name.length < 2) return res.status(400).json({ msg: "Name cannot be bigger than 50 or smaller than 2" });
  }
  if (req.body.email) {
    if (typeof req.body.email !== "string") return res.status(400).json({ msg: "Email must be string" });
    if (req.body.email.length > 50 || req.body.email.length < 6) return res.status(400).json({ msg: "Email cannot be bigger than 50 or smaller than 2" });
  }
  if (req.body.phoneNumber) {
    if (typeof req.body.phoneNumber !== "string") return res.status(400).json({ msg: "´PhoneNumber must be string" });
    if (req.body.phoneNumber.length > 15 || req.body.phoneNumber.length < 6) {
      return res
        .status(400)
        .json({ msg: "Phonenumber cannot be bigger than 15 or smaller than 6" });
    }
    // eslint-disable-next-line eqeqeq
    if (parseInt(req.body.phoneNumber, 10) != req.body.phoneNumber) {
      return res
        .status(400)
        .json({ msg: "PhoneNumber must contain only numbers" });
    }
  }
  if (req.body.cuit) {
    if (typeof req.body.cuit !== "string") return res.status(400).json({ msg: "Cuit must be string" });
    if (req.body.cuit.length > 15 || req.body.cuit.length < 6) {
      return res
        .status(400)
        .json({ msg: "Cuit cannot be bigger than 15 or smaller than 6" });
    }
    // eslint-disable-next-line eqeqeq
    if (parseInt(req.body.cuit, 10) != req.body.cuit) {
      return res
        .status(400)
        .json({ msg: "Cuit must contain only numbers" });
    }
  }
  if (req.body.address) {
    if (typeof req.body.address !== "string") return res.status(400).json({ msg: "Address must be string" });
    if (req.body.address.length > 100 || req.body.address.length < 6) return res.status(400).json({ msg: "Address cannot be bigger than 100 or smaller than 6" });
  }
  if (req.body.activity) {
    if (typeof req.body.activity !== "string") return res.status(400).json({ msg: "Activity must be string" });
    if (req.body.activity.length > 30 || req.body.activity.length < 3) return res.status(400).json({ msg: "Activity cannot be bigger than 20 or smaller than 3" });
  }
  next();
};

const dataBodyUnique = (req, res, next) => {
  Clients.find({ name: req.body.name })
    .then((client) => {
      if (client.length > 0) {
        if (!req.params.id) {
          throw new Error(res.status(400).json({ msg: "Name is already in use" }));
        // eslint-disable-next-line eqeqeq
        } else if (req.params.id != client[0]._id) {
          throw new Error(res.status(400).json({ msg: "Name is already in use" }));
        }
      }
      return Clients.find({ email: req.body.email });
    })
    .then((client) => {
      if (client.length > 0) {
        if (!req.params.id) {
          throw new Error(res.status(400).json({ msg: "Email is already in use" }));
        // eslint-disable-next-line eqeqeq
        } else if (req.params.id != client[0]._id) {
          throw new Error(res.status(400).json({ msg: "Email is already in use" }));
        }
      }
      return Clients.find({ phoneNumber: req.body.phoneNumber });
    })
    .then((client) => {
      if (client.length > 0) {
        if (!req.params.id) {
          throw new Error(res.status(400).json({ msg: "PhoneNumber is already in use" }));
        // eslint-disable-next-line eqeqeq
        } else if (req.params.id != client[0]._id) {
          throw new Error(res.status(400).json({ msg: "PhoneNumber is already in use" }));
        }
      }
      return Clients.find({ cuit: req.body.cuit });
    })
    .then((client) => {
      if (client.length > 0) {
        if (!req.params.id) {
          throw new Error(res.status(400).json({ msg: "Cuit is already in use" }));
        // eslint-disable-next-line eqeqeq
        } else if (req.params.id != client[0]._id) {
          throw new Error(res.status(400).json({ msg: "Cuit is already in use" }));
        }
      }
      next();
    })
    .catch((error) => error);
};

module.exports = {
  dataBodyRequired,
  formatBodyRequired,
  dataBodyUnique,
};
