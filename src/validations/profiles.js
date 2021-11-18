/* eslint-disable consistent-return */
const required = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).send("Name is required");
  }
  if (!req.body.description) {
    return res.status(400).send("Description is required");
  }
  next();
};

const validate = (req, res, next) => {
  const { name } = req.body;
  const { description } = req.body;
  if (name) {
    if (name.length > 50) {
      return res.status(400).send("Name must have less than 50 characters");
    } if (typeof name !== "string") {
      return res.status(400).send("Name must be string");
    }
  }
  next();
  if (description) {
    if (description.length > 500) {
      return res
        .status(400)
        .send("Description must have less than 500 characters");
    } if (typeof description !== "string") {
      return res.status(400).send("Description must be string");
    }
  }
  next();
};

module.exports = {
  required,
  validate,
};
