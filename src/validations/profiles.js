/* eslint-disable consistent-return */
const required = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({ msg: "Name is required" });
  }
  if (!req.body.description) {
    return res.status(400).json({ msg: "Description is required" });
  }
  next();
};

const validate = (req, res, next) => {
  const { name } = req.body;
  const { description } = req.body;
  if (name) {
    if (name.length > 50) {
      return res.status(400).json({ msg: "Name must have less than 50 characters" });
    } if (typeof name !== "string") {
      return res.status(400).json({ msg: "Name must be string" });
    }
  }
  if (description) {
    if (description.length > 500) {
      return res
        .status(400)
        .json({ msg: "Description must have less than 500 characters" });
    } if (typeof description !== "string") {
      return res.status(400).json({ msg: "Description must be string" });
    }
  }
  next();
};

module.exports = {
  required,
  validate,
};
