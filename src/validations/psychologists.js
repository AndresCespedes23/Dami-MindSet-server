const dataBodyRequired = (req, res, next) => {
  if (!req.body.name) return res.status(400).json({ Msg: "Name is missing" });
  if (!req.body.username)
    return res.status(400).json({ Msg: "Username is missing" });
  if (!req.body.email) return res.status(400).json({ Msg: "Email is missing" });
  if (!req.body.password)
    return res.status(400).json({ Msg: "Password is missing" });
  if (!req.body.phoneNumber)
    return res.status(400).json({ Msg: "PhoneNumber is missing" });
  if (!req.body.enrollmentNumber)
    return res.status(400).json({ Msg: "EnrollmentNumber is missing" });
  if (!req.body.status)
    return res.status(400).json({ Msg: "Status is missing" });

  if (req.body.timeRange) {
    if (req.body.timeRange.length !== 2)
      return res.status(400).json({ Msg: "TimeRange accepts only two values" });
  }
  if (req.body.dayRange) {
    if (req.body.dayRange.length > 7)
      return res
        .status(400)
        .json({ Msg: "DayRange length cannot be higger than seven" });
  }
  next();
};

const formatBodyRequired = (req, res, next) => {
  if (req.body.name.length > 30)
    return res.status(400).json({ Msg: "Name cannot be bigger than 30" });
  if (req.body.email.length > 30)
    return res.status(400).json({ Msg: "Email cannot be bigger than 30" });
  if (req.body.username.length > 30)
    return res.status(400).json({ Msg: "Username cannot be bigger than 30" });
  if (req.body.password.length > 30)
    return res.status(400).json({ Msg: "Password cannot be bigger than 30" });

  if (req.body.phoneNumber.length > 15)
    return res
      .status(400)
      .json({ Msg: "Phonenumber cannot be bigger than 30" });
  // eslint-disable-next-line eqeqeq
  if (parseInt(req.body.phoneNumber) != req.body.phoneNumber)
    return res
      .status(400)
      .json({ Msg: "PhoneNumber must contain only numbers" });

  if (req.body.enrollmentNumber.length > 4)
    return res
      .status(400)
      .json({ Msg: "EnrollmentNumber cannot be bigger than 4" });
  // eslint-disable-next-line eqeqeq
  if (parseInt(req.body.enrollmentNumber) != req.body.enrollmentNumber)
    return res
      .status(400)
      .json({ Msg: "EnrollmentNumber must contain only numbers" });

  if (req.body.status !== "true" && req.body.status !== "false")
    return res.status(400).json({ Msg: "Status must be true or false" });

  const timeRange = req.body.timeRange;
  if (timeRange) {
    let flag1 = false;
    let flag2 = false;
    timeRange.forEach((element) => {
      // eslint-disable-next-line eqeqeq
      if (parseInt(element) != element) return (flag1 = true);
      if (element < 0 || element > 24) return (flag2 = true);
    });
    if (flag1)
      return res.status(400).json({ Msg: "TimeRange accepts only numbers" });
    if (flag2)
      return res
        .status(400)
        .json({ Msg: "TimeRange values must be between 0 and 24" });

    if (timeRange[0] >= timeRange[1])
      return res.status(400).json({
        Msg: "TimeRange first value must be smaller than the second one",
      });
  }

  const dayRange = req.body.dayRange;
  if (dayRange) {
    let flag1 = false;
    let flag2 = false;
    let flag3 = false;
    dayRange.forEach((element, index) => {
      // eslint-disable-next-line eqeqeq
      if (parseInt(element) != element) return (flag1 = true);
      if (element < 1 || element > 7) return (flag2 = true);
      if (dayRange.indexOf(element) !== index) return (flag3 = true);
    });
    if (flag1)
      return res.status(400).json({ Msg: "DayRange accepts only numbers" });
    if (flag2)
      return res
        .status(400)
        .json({ Msg: "DayRange values must be between 1 and 7" });
    if (flag3)
      return res
        .status(400)
        .json({ Msg: "DayRange does not allow repeted values" });
  }
  next();
};

module.exports = {
  dataBodyRequired,
  formatBodyRequired,
};
