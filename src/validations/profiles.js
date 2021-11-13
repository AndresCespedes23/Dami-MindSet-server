const required = (req, res) => {
  if (!req.body.name) {
    return res.status(400).send("Name is required");
  }
  if (!req.description.name) {
    return res.status(400).send("Description is required");
  }
};

const validate = (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  if (name.length > 50) {
    return res.status(400).send("Name must have less than 50 characters");
  }
  if (description.length > 500) {
    return res
      .status(400)
      .send("Description must have less than 500 characters");
  }
};

module.exports = {
  required,
  validate,
};
