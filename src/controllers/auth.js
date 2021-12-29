const Users = require("../models/Users");
const Firebase = require("../helper/firebase");

const register = async (req, res) => {
  try {
    const newFirebaseUser = await Firebase.auth().createUser({
      email: req.body.email,
      password: req.body.password,
      userType: req.body.userType,
    });
    const userCreated = await Users({
      email: req.body.email,
      password: req.body.password,
      userType: req.body.userType,
      firebaseUid: newFirebaseUser.uid,
    });
    const userSaved = await userCreated.save();
    return res.status(201).json({
      message: "User created",
      data: userSaved,
    });
  } catch (error) {
    return res.status(400).json({ message: error.toString() });
  }
};

module.exports = {
  register,
};
