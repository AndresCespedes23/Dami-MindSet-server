const Psychologists = require("../models/psychologists");

const dataBodyRequired = (req, res, next) => {
  if (!req.body.name) return res.status(400).json({ Msg: "Name is missing" });
  if (!req.body.username) return res.status(400).json({ Msg: "Username is missing" });
  if (!req.body.email) return res.status(400).json({ Msg: "Email is missing" });
  if (!req.body.password) return res.status(400).json({ Msg: "Password is missing" });
  if (!req.body.phoneNumber) return res.status(400).json({ Msg: "PhoneNumber is missing" });
  if (!req.body.enrollmentNumber) return res.status(400).json({ Msg: "EnrollmentNumber is missing" });
  if (!req.body.status) return res.status(400).json({ Msg: "Status is missing" });
  next();
};

const formatBodyRequired = (req, res, next) => {
  if (req.body.name) {
    if (typeof req.body.name !== "string") return res.status(400).json({ Msg: "Name must be string" });
    if (req.body.name.length > 30) return res.status(400).json({ Msg: "Name cannot be bigger than 30" });
  }
  if (req.body.email) {
    if (typeof req.body.email !== "string") return res.status(400).json({ Msg: "Email must be string" });
    if (req.body.email.length > 30) return res.status(400).json({ Msg: "Email cannot be bigger than 30" });
  }
  if (req.body.username) {
    if (typeof req.body.username !== "string") return res.status(400).json({ Msg: "Username must be string" });
    if (req.body.username.length > 30) return res.status(400).json({ Msg: "Username cannot be bigger than 30" });
  }
  if (req.body.password) {
    if (typeof req.body.password !== "string") return res.status(400).json({ Msg: "Password must be string" });
    if (req.body.password.length > 30) return res.status(400).json({ Msg: "Password cannot be bigger than 30" });
  }
  if (req.body.phoneNumber) {
    if (typeof req.body.phoneNumber !== "string") return res.status(400).json({ Msg: "´PhoneNumber must be string" });
    if (req.body.phoneNumber.length > 15) return res.status(400).json({ Msg: "Phonenumber cannot be bigger than 15" });
    // eslint-disable-next-line eqeqeq
    if (parseInt(req.body.phoneNumber) != req.body.phoneNumber) return res.status(400).json({ Msg: "PhoneNumber must contain only numbers" });
  }
  if (req.body.enrollmentNumber) {
    if (typeof req.body.enrollmentNumber !== "string") return res.status(400).json({ Msg: "EnrollmentNumber must be string" });
    if (req.body.enrollmentNumber.length > 4) return res.status(400).json({ Msg: "EnrollmentNumber cannot be bigger than 4" });
    // eslint-disable-next-line eqeqeq
    if (parseInt(req.body.enrollmentNumber) != req.body.enrollmentNumber) return res.status(400).json({ Msg: "EnrollmentNumber must contain only numbers" });
  }
  if (req.body.status
    && typeof req.body.status !== "boolean")
    return res.status(400).json({ Msg: "Status must be boolean" });
  const timeRange = req.body.timeRange;
  if (timeRange) {
    if (timeRange.length !== 2) return res.status(400).json({ Msg: "TimeRange accepts only two values" });
    let flag1 = false;
    let flag2 = false;
    timeRange.forEach((element) => {
      // eslint-disable-next-line eqeqeq
      if (parseInt(element) != element) return (flag1 = true);
      if (element < 0 || element > 24) return (flag2 = true);
    });
    if (flag1) return res.status(400).json({ Msg: "TimeRange accepts only numbers" });
    if (flag2) return res.status(400).json({ Msg: "TimeRange values must be between 0 and 24" });
    if (timeRange[0] >= timeRange[1]) return res.status(400).json({ Msg: "TimeRange first value must be smaller than the second one"});
  }
  const dayRange = req.body.dayRange;
  if (dayRange) {
    if (dayRange.length > 7) return res.status(400).json({ Msg: "DayRange length cannot be higger than seven" });
    let flag1 = false;
    let flag2 = false;
    let flag3 = false;
    dayRange.forEach((element, index) => {
      // eslint-disable-next-line eqeqeq
      if (parseInt(element) != element) return (flag1 = true);
      if (element < 1 || element > 7) return (flag2 = true);
      if (dayRange.indexOf(element) !== index) return (flag3 = true);
    });
    if (flag1) return res.status(400).json({ Msg: "DayRange accepts only numbers" });
    if (flag2) return res.status(400).json({ Msg: "DayRange values must be between 1 and 7" });
    if (flag3) return res.status(400).json({ Msg: "DayRange does not allow repeted values" });
  }
  next();
};

const dataBodyUnique = (req, res, next) => {
  Psychologists.find()
    .then((psychologists) => {
      let flag1 = false;
      let flag2 = false;
      let flag3 = false;
      let flag4 = false;
      psychologists.forEach(psychologist => {
        if (psychologist.email
          && psychologist.email === req.body.email) return flag1 = true;
        if (psychologist.username
          && psychologist.username === req.body.username) return flag2 = true;
        if (psychologist.phoneNumber
          && psychologist.phoneNumber === req.body.phoneNumber) return flag3 = true;
        if (psychologist.enrollmentNumber
          && psychologist.enrollmentNumber === req.body.enrollmentNumber) return flag4 = true;
      });
      if (flag1) return res.status(400).json({ Msg: "Email is already in use" });
      if (flag2) return res.status(400).json({ Msg: "Username is already in use" });
      if (flag3) return res.status(400).json({ Msg: "PhoneNumber is already in use" });
      if (flag4) return res.status(400).json({ Msg: "EnrollmentNumber is already in use" });
      next();
    })
    .catch((error) => {
      return res.status(400).json(error);
    });

};

module.exports = {
  dataBodyRequired,
  formatBodyRequired,
  dataBodyUnique
};
