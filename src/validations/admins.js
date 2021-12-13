/* eslint-disable consistent-return */
const required = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({ msg: "Name is required" });
  }
  if (!req.body.email) {
    return res.status(400).json({ msg: "Email is required" });
  }
  if (!req.body.username) {
    return res.status(400).json({ msg: "Username is required" });
  }
  if (!req.body.password) {
    return res.status(400).json({ msg: "Password is required" });
  }
  next();
};

module.exports = {
  required,
};
