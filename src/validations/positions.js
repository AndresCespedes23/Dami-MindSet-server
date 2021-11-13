const validateFields = (req, res, next) => {
  if (
    !req.body.idClient ||
    !req.body.idProfile ||
    !req.body.name ||
    !req.body.description ||
    !req.body.status ||
    !req.body.address ||
    !req.body.city ||
    !req.body.postalCode
  ) {
    return res.status(400).json({ Msg: "Some parameters are missing" });
  }
  next();
};

module.exports = {
  validateFields,
};
