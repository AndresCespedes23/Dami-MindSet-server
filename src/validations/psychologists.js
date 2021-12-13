/* eslint-disable consistent-return */
const Psychologists = require("../models/psychologists");

const dataBodyRequired = (req, res, next) => {
  if (!req.body.name) return res.status(400).json({ msg: "Name is missing" });
  if (!req.body.username) return res.status(400).json({ msg: "Username is missing" });
  if (!req.body.email) return res.status(400).json({ msg: "Email is missing" });
  if (!req.body.password) return res.status(400).json({ msg: "Password is missing" });
  if (!req.body.phoneNumber) return res.status(400).json({ msg: "PhoneNumber is missing" });
  if (!req.body.enrollmentNumber) return res.status(400).json({ msg: "EnrollmentNumber is missing" });
  next();
};

const formatBodyRequired = (req, res, next) => {
  if (req.body.name) {
    if (typeof req.body.name !== "string") return res.status(400).json({ msg: "Name must be string" });
    if (req.body.name.length > 30) return res.status(400).json({ msg: "Name cannot be bigger than 30" });
  }
  if (req.body.email) {
    if (typeof req.body.email !== "string") return res.status(400).json({ msg: "Email must be string" });
    if (req.body.email.length > 30) return res.status(400).json({ msg: "Email cannot be bigger than 30" });
  }
  if (req.body.username) {
    if (typeof req.body.username !== "string") return res.status(400).json({ msg: "Username must be string" });
    if (req.body.username.length > 30) return res.status(400).json({ msg: "Username cannot be bigger than 30" });
  }
  if (req.body.password) {
    if (typeof req.body.password !== "string") return res.status(400).json({ msg: "Password must be string" });
    if (req.body.password.length > 30) return res.status(400).json({ msg: "Password cannot be bigger than 30" });
  }
  if (req.body.phoneNumber) {
    if (typeof req.body.phoneNumber !== "string") return res.status(400).json({ msg: "PhoneNumber must be string" });
    if (req.body.phoneNumber.length > 15) {
      return res
        .status(400)
        .json({ msg: "Phonenumber cannot be bigger than 15" });
    }
    // eslint-disable-next-line eqeqeq
    if (parseInt(req.body.phoneNumber, 10) != req.body.phoneNumber) {
      return res
        .status(400)
        .json({ msg: "PhoneNumber must contain only numbers" });
    }
  }
  if (req.body.enrollmentNumber) {
    if (typeof req.body.enrollmentNumber !== "string") return res.status(400).json({ msg: "EnrollmentNumber must be string" });
    if (req.body.enrollmentNumber.length > 4) {
      return res
        .status(400)
        .json({ msg: "EnrollmentNumber cannot be bigger than 4" });
    }
    // eslint-disable-next-line eqeqeq
    if (parseInt(req.body.enrollmentNumber, 10) != req.body.enrollmentNumber) {
      return res
        .status(400)
        .json({ msg: "EnrollmentNumber must contain only numbers" });
    }
  }
  if (req.body.status && typeof req.body.status !== "string") return res.status(400).json({ msg: "Status must be strings" });
  // const { timeRange } = req.body;
  // if (timeRange) {
  //   if (timeRange.length !== 2)
  //  return res.status(400).json({ msg: "TimeRange accepts only two values" });
  //   let containChars = false;
  //   let isBiggerOrSmaller = false;
  //   timeRange.forEach((element) => {
  //     // eslint-disable-next-line eqeqeq
  //     if (parseInt(element, 10) != element) {
  //       containChars = true;
  //       return containChars;
  //     }
  //     if (element < 0 || element > 24) {
  //       isBiggerOrSmaller = true;
  //       return isBiggerOrSmaller;
  //     }
  //   });
  //   if (containChars) return res.status(400).json({ msg: "TimeRange accepts only numbers" });
  //   if (isBiggerOrSmaller) {
  //     return res
  //       .status(400)
  //       .json({ msg: "TimeRange values must be between 0 and 24" });
  //   }
  //   if (timeRange[0] >= timeRange[1]) {
  //     return res.status(400).json({
  //       msg: "TimeRange first value must be smaller than the second one",
  //     });
  //   }
  // }
  // const { dayRange } = req.body;
  // if (dayRange) {
  //   if (dayRange.length > 7) {
  //     return res
  //       .status(400)
  //       .json({ msg: "DayRange length cannot be higger than seven" });
  //   }
  //   let containChars = false;
  //   let isBiggerOrSmaller = false;
  //   let containRepetedElements = false;
  //   dayRange.forEach((element, index) => {
  //     // eslint-disable-next-line eqeqeq
  //     if (parseInt(element, 10) != element) {
  //       containChars = true;
  //       return containChars;
  //     }
  //     if (element < 1 || element > 7) {
  //       isBiggerOrSmaller = true;
  //       return isBiggerOrSmaller;
  //     }
  //     if (dayRange.indexOf(element) !== index) {
  //       containRepetedElements = true;
  //       return containRepetedElements;
  //     }
  //   });
  //   if (containChars) return res.status(400).json({ msg: "DayRange accepts only numbers" });
  //   if (isBiggerOrSmaller) {
  //     return res
  //       .status(400)
  //       .json({ msg: "DayRange values must be between 1 and 7" });
  //   }
  //   if (containRepetedElements) {
  //     return res
  //       .status(400)
  //       .json({ msg: "DayRange does not allow repeted values" });
  //   }
  // }
  next();
};

const dataBodyUnique = (req, res, next) => {
  Psychologists.find({ email: req.body.email })
    .then((psychologist) => {
      if (psychologist.length > 0) {
        throw new Error(
          res.status(400).json({ msg: "Email is already in use" }),
        );
      }
      return Psychologists.find({ username: req.body.username });
    })
    .then((psychologist) => {
      if (psychologist.length > 0) {
        throw new Error(
          res.status(400).json({ msg: "Username is already in use" }),
        );
      }
      return Psychologists.find({ phoneNumber: req.body.phoneNumber });
    })
    .then((psychologist) => {
      if (psychologist.length > 0) {
        throw new Error(
          res.status(400).json({ msg: "PhoneNumber is already in use" }),
        );
      }
      return Psychologists.find({
        enrollmentNumber: req.body.enrollmentNumber,
      });
    })
    .then((psychologist) => {
      if (psychologist.length > 0) {
        throw new Error(
          res.status(400).json({ msg: "EnrollmentNumber is already in use" }),
        );
      }
      next();
    })
    .catch((error) => error);
};

module.exports = {
  dataBodyRequired,
  formatBodyRequired,
  dataBodyUnique,
};
