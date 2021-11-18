/* eslint-disable consistent-return */
const required = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).send("Name is required");
  }
  if (!req.body.email) {
    return res.status(400).send("Email is required");
  }
  if (!req.body.username) {
    return res.status(400).send("User name is required");
  }
  if (!req.body.password) {
    return res.status(400).send("Password is required");
  }
  if (!req.body.isSuperAdmin) {
    return res
      .status(400)
      .send("You should be super admin to load new information!");
  }
  next();
};

module.exports = {
  required,
};
