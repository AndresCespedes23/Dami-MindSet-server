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

const validateFieldsType = (req, res, next) => {
  const idClient = req.body.idClient;
  const idProfile = req.body.idProfile;
  const name = req.body.name;
  const description = req.body.description;
  const status = req.body.status;
  const address = req.body.address;
  const city = req.body.city;
  const postalCode = req.body.postalCode;
  if(!idClient.length === 24) return res.status(400).json("Error");
  if(!idProfile.length === 24) return res.status(400).json("Error");
  if(name.length > 50) return res.status(400).json("Error");
  if(description.length > 50) return res.status(400).json("Error");
  if(!status === "DONE" || !status === "PENDING") return res.status(400).json("Error");
  if(address.length > 50) return res.status(400).json("Error");
  if(city.length > 50) return res.status(400).json("Error");
  if(postalCode.length < 4 || postalCode.length >8) return res.status(400).json("Error");
  next();
};

module.exports = {
  validateFields,
  validateFieldsType,
};
