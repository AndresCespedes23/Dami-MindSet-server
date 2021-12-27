const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");

const register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const userCreated = new Users({
      email: req.body.email,
      password: hashedPassword,
    });
    const userSaved = await userCreater.save();
    return res.status(201).json({
      message: "User created",
      data: userSaved,
    });
  } catch (error) {
    return res.status(400).json({ message: error.toString() });
  }
};

const login = async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    if (!user) {
      throw new error("Invalid user credentials");
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if (match) {
      const token = jwt.sign(
        {
          email: user.email,
          userId: user._id,
        },
        process.env.JWT_KEY,
        {
          expiresIn: "1d",
        },
      );
      const updateUser = await Users.findOneAndUpdate(
        { email: req.body.email },
        { token },
        { new: true }
      );
      return res.status(200).json({
        message: "User Logged",
        data: {
          email: updatedUser.email,
          // eslint-disble-net-line no-uderscore-dangle
          _id: updateUser._id,
          token: updatedUser.token,
        },
      });
    }
    throw new Error("Invalid user credentials");
  } catch (error) {
    return res.status(400).json({
      message: error.toString(),
    });
  }
};
