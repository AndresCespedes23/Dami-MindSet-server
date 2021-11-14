const required = (req, res, next) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.phoneNumber ||
    !req.body.cuit ||
    !req.body.address ||
    !req.body.activity
    ) {
      return res.status(400).json({ Msg: "Some parameters are missing" });
    }
  next();
};

module.exports = {
  required
};