const Candidates = require("../models/candidates");
const Psychologists = require("../models/psychologists");
const Admins = require("../models/admins");
const Firebase = require("../helper/firebase");

const register = async (req, res) => {
  try {
    const newFirebaseUser = await Firebase.auth().createUser({
      email: req.body.email,
      password: req.body.password,
      userType: req.body.userType,
    });
    let userCreated;
    switch (req.body.userType) {
      case "CANDIDATE":
        userCreated = await Candidates({
          name: req.body.name,
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          userType: req.body.userType,
          firebaseUid: newFirebaseUser.uid,
        });
        break;
      case "PSYCHOLOGIST":
        userCreated = await Psychologists({
          name: req.body.name,
          email: req.body.email,
          username: req.body.username,
          password: req.body.password,
          phoneNumber: req.body.phoneNumber,
          enrollmentNumber: req.body.enrollmentNumber,
          status: req.body.status,
          timeStart: req.body.timeStart,
          timeEnd: req.body.timeEnd,
          dayStart: req.body.dayStart,
          dayEnd: req.body.dayEnd,
          firebaseUid: newFirebaseUser.uid,
        });
        break;
      case "ADMIN":
        userCreated = await Admins({
          name: req.body.name,
          email: req.body.email,
          username: req.body.username,
          password: req.body.password,
          firebaseUid: newFirebaseUser.uid,
        });
        break;
      default:
        break;
    }
    await Firebase.auth().setCustomUserClaims(newFirebaseUser.uid, {
      userType: req.body.userType,
      id: userCreated._id,
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
