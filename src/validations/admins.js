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
  if (!req.body.isSuperAdmin) {
    return res.status(400).json({ msg: "You should be super admin to load new information!" });
  }
  next();
};

module.exports = {
  required,
};
